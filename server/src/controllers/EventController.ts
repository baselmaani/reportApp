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

@Controller('/event')
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
  @Summary('Return list of events nearby given location')
  @Returns(200, Array).Of(FeedModel)
  async getNearBy(
    @Req() req: any,
    @QueryParams('lat') lat: number,
    @QueryParams('lng') lng: number,
    @QueryParams('pageParam') pageParam: number
  ) {
    // const cityName = await GoogleGeoService.getCity(lat, lng);
    // console.log(cityName);
    const cityName = 'Trollhattan';
    const city = await this.prisma.city.findFirst({
      where: {
        name: cityName,
      },
    });
    if (city) {
      const result = await this.prisma.event.findMany({
        where: {
          registerFrom: {
            lte: new Date(),
          },
          registerTo: {
            gte: new Date(),
          },
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
          participationFeilds: true,
          _count: {
            select: {
              reviews: true,
              participants: true,
            },
          },
          participants: {
            where: {
              id: req.user.id,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return result;
    }
    return [];
  }

  @Post('/participate')
  @Authorize('user')
  @Description('participate user to event')
  @Returns(200, FeedModel)
  async participate(@Req() req: any, @BodyParams('eventId') eventId: number) {
    const isParticipated = await this.prisma.event.findFirst({
      where: {
        id: eventId,
        participants: {
          some: {
            id: req.user.id,
          },
        },
      },
    });

    if (isParticipated) {
      // remove participatino if exist and the samme reaction
      return this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          participants: {
            disconnect: {
              id: req.user.id,
            },
          },
        },
      });
    } else {
      await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          participants: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });

      const toAddPoints = process.env.PARTICIPATION_POINTS || 7;
      await this.prisma.point.create({
        data: {
          userId: req.user.id,
          value: parseFloat(toAddPoints.toString()),
          sourceType: 'eventParticipation',
        },
      });
    }
  }
}
