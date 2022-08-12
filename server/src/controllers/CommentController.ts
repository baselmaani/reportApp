import { CommentInput } from './../models/CommentModel';
import { PrismaClient } from '@prisma/client';
import { BodyParams, QueryParams, Req } from '@tsed/common';

import { Inject, Controller } from '@tsed/di';

import {
  Delete,
  Description,
  Get,
  Groups,
  number,
  Post,
  Put,
  Returns,
  Summary,
} from '@tsed/schema';
import { Authorize } from '@tsed/passport';
import { FeedModel } from 'src/models/FeedModel';
import { PointModel } from 'src/models/PointModel';
import { CategoryModel } from '../models/CategoryModel';

@Controller('/comment')
export class FeedController {
  @Inject()
  protected prisma: PrismaClient;

  @Get('/all')
  @Summary('Return list of comments by ids')
  @Returns(200, Array).Of(FeedModel)
  getAll() {
    return this.prisma.comment.findMany();
  }

  @Get('/byfeed')
  @Summary('Return list of comments by ids')
  @Returns(200, Array).Of(FeedModel)
  getByFeed(
    @QueryParams('feedId') feedId: number,
    @QueryParams('limit') limit: number
  ) {
    console.log('feedId');
    console.log(feedId);
    return this.prisma.comment.findMany({
      where: {
        feedId: feedId,
      },
      take: limit,
      include: {
        user: true,
      },
    });
  }

  @Post('/')
  @Authorize('user')
  @Summary('Create a new comment')
  @Returns(201, Array).Of(number)
  async insert(
    @Req() req: any,
    @BodyParams() @Groups('creation') comment: CommentInput
  ) {
    console.log('comment', comment);
    return this.prisma.comment.create({
      data: { ...comment, userId: req.user.id },
    });
  }

  @Delete('/')
  @Authorize('user')
  @Summary('delete your comment')
  @Returns(201, Array).Of(number)
  async delete(@Req() req: any, @QueryParams('id') id: number) {
    return this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }
}
