import { FeedReactionInput } from './../models/FeedModel';
import { GoogleGeoService } from './../services/GoogleGeoService';
import { PrismaClient, Report, Comment } from '@prisma/client';
import { BodyParams, QueryParams, Req } from '@tsed/common';

import { Inject, Controller } from '@tsed/di';

import {
  Description,
  Get,
  Groups,
  Post,
  Put,
  Returns,
  Summary,
} from '@tsed/schema';
import { Authorize } from '@tsed/passport';
import { FeedModel } from 'src/models/FeedModel';
import { PointModel } from 'src/models/PointModel';

@Controller('/feed')
export class FeedController {
  @Inject()
  protected prisma: PrismaClient;

  @Get('/all')
  @Summary('Return list of categories by ids')
  @Returns(200, Array).Of(FeedModel)
  getAll() {
    return this.prisma.report.findMany();
  }

  @Get('/nearby')
  @Authorize('user')
  @Summary('Return list of feeds nearby given location')
  @Returns(200, Array).Of(FeedModel)
  async getNearBy(
    @Req() req: any,
    @QueryParams('lat') lat: number,
    @QueryParams('lng') lng: number,
    @QueryParams('pageParam') pageParam: number
  ) {
    // const cityName = await GoogleGeoService.getCity(lat, lng);
    const cityName = 'Trollhattan';
    const city = await this.prisma.city.findFirst({
      where: {
        name: cityName,
      },
    });
    if (city) {
      return this.prisma.feed.findMany({
        where: {
          organization: {
            city: {
              id: city.id,
            },
          },
        },
        skip: pageParam * 2,
        take: 2,
        include: {
          organization: true,
          feedReactions: true,
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    return [];
  }

  @Post('/react')
  @Authorize('user')
  @Description('add feed reaction')
  @Returns(200, FeedModel)
  async addReaction(
    @Req() req: any,
    @BodyParams() @Groups('creation') reportReaction: FeedReactionInput
  ) {
    const { value, feedId } = reportReaction;
    const isExistReaction = await this.prisma.feedReaction.findFirst({
      where: {
        userId: req.user.id,
        feedId: feedId,
      },
    });

    if (isExistReaction) {
      // remove reaction if exist and the samme reaction
      if (isExistReaction.value === value) {
        return this.prisma.feedReaction.delete({
          where: {
            id: isExistReaction.id,
          },
        });
      }
      return this.prisma.feedReaction.update({
        where: {
          id: isExistReaction.id,
        },
        data: {
          value: value,
        },
      });
    }
    const toAddPoints = process.env.FEED_REACTION_POINTS || 2;
    await this.prisma.point.create({
      data: {
        userId: req.user.id,
        value: parseFloat(toAddPoints.toString()),
        sourceType: 'feedReaction',
      },
    });
    return this.prisma.feedReaction.create({
      data: {
        value,
        userId: req.user.id,
        feedId: feedId,
      },
    });
  }
}
