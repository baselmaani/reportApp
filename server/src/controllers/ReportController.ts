import {
  ReportReactionModel,
  ReportReactionInput,
} from './../models/ReportReactionModel';
import { ReportInput } from './../models/ReportModel';
import { PrismaClient, Report } from '@prisma/client';
import { ReportModel } from 'src/models/ReportModel';
import {
  BodyParams,
  MultipartFile,
  PathParams,
  PlatformMulterFile,
  QueryParams,
  Req,
} from '@tsed/common';

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

@Controller('/reports')
export class ReportController {
  @Inject()
  protected prisma: PrismaClient;

  @Get('/all')
  @Summary('Return list of categories by ids')
  @Returns(200, Array).Of(ReportModel)
  getAll() {
    return this.prisma.report.findMany();
  }

  @Get('/nearby')
  @Authorize('user')
  @Summary('Return list of reports nearby given location')
  @Returns(200, Array).Of(ReportModel)
  async getNearBy(
    @Req() req: any,
    @QueryParams('lat') lat: number,
    @QueryParams('lng') lng: number
  ) {
    /*
    const query: Report[] = await this.prisma
      .$queryRaw`SELECT id FROM "Report" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${lng}, ${lat})::geography, 1 * 1000)`;
*/
    return this.prisma.report.findMany({
      where: {
        //  id: { in: query.map((c) => c.id) },
        isPublic: true,
        isHandled: false,
      },
      include: {
        reportReactions: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });
  }

  @Get('/many')
  @Summary('Return list of organizations by ids')
  @Returns(200, Array).Of(ReportModel)
  getManyById(@QueryParams('id') id: string[]) {
    return this.prisma.report.findMany({
      where: { id: { in: id.map((c) => parseInt(c)) } },
    });
  }

  @Post('/')
  @Authorize('user')
  @Summary('Create a new report')
  @Returns(201, Array).Of(number)
  async insert(
    @Req() req: any,
    @BodyParams() @Groups('creation') report: ReportInput
  ) {
    const {
      title,
      description,
      categories,
      images,
      longitude,
      latitude,
      isPublic,
    } = report;
    const toAddPoints = process.env.ADD_REPORT_POINTS || 10;
    await this.prisma.point.create({
      data: {
        userId: req.user.id,
        value: parseFloat(toAddPoints.toString()),
        sourceType: 'report',
      },
    });
    return this.prisma.report.create({
      data: {
        title,
        description,
        categories: {
          connect: categories.map((c) => ({ id: c })),
        },
        images,
        longitude,
        latitude,
        isPublic,
        userId: req.user.id,
      },
    });
  }

  @Post('/react')
  @Authorize('user')
  @Description('add slide reaction')
  @Returns(200, ReportReactionModel)
  async addReaction(
    @Req() req: any,
    @BodyParams() @Groups('creation') reportReaction: ReportReactionInput
  ) {
    const { value, reportId } = reportReaction;
    const isExistReaction = await this.prisma.reportReaction.findFirst({
      where: {
        userId: req.user.id,
        reportId: reportId,
      },
    });

    if (isExistReaction) {
      return this.prisma.reportReaction.update({
        where: {
          id: isExistReaction.id,
        },
        data: {
          value: value,
        },
      });
    }
    const toAddPoints = process.env.ADD_REACTION_POINTS || 5;
    await this.prisma.point.create({
      data: {
        userId: req.user.id,
        value: parseFloat(toAddPoints.toString()),
        sourceType: 'reaction',
      },
    });
  }

  @Put('/:id')
  @Summary('update one user by id')
  @Returns(201, ReportModel)
  async update(
    @BodyParams() @Groups('creation') report: ReportModel,
    @PathParams('id') id: string
  ) {
    return this.prisma.report.update({
      where: { id: parseInt(id) },
      data: report,
    });
  }

  @Put('/')
  @Summary('update many users by ids')
  @Returns(201, Array).Of(ReportModel)
  async updateMany(
    @BodyParams() report: ReportModel,
    @QueryParams('filter') filter: string[]
  ) {
    return this.prisma.report.updateMany({
      where: {
        id: { in: filter.map((c) => parseInt(c)) },
      },
      data: report,
    });
  }

  @Delete('/:id')
  @Summary('Delete one user by id')
  @Returns(200, Array).Of(ReportModel)
  delete(@PathParams('id') id: string) {
    return this.prisma.report.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  @Delete('/')
  @Summary('Delete many user by ids')
  @Returns(200, Array).Of(ReportModel)
  deleteMany(@BodyParams('ids') ids: string[]) {
    console.log('ids', ids);
    return this.prisma.report.deleteMany({
      where: {
        id: {
          in: ids.map((c) => parseInt(c)),
        },
      },
    });
  }
}
