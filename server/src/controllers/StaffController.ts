import { StaffService } from './../services/StaffService';
import { UserInput } from './../models/UserModel';
import { EmailService } from './../services/EmailService';
import { PrismaClient } from '@prisma/client';
import { BodyParams, PathParams, QueryParams, Req } from '@tsed/common';
import { Controller, Inject } from '@tsed/di';
import {
  Delete,
  Get,
  Groups,
  number,
  Post,
  Put,
  Returns,
  Summary,
} from '@tsed/schema';
import { UserModel } from 'src/models/UserModel';
import { Authorize } from '@tsed/passport';
import { ReportModel } from 'src/models/ReportModel';

@Controller('/staff')
export class StaffController {
  @Inject()
  protected prisma: PrismaClient;

  @Get('/profile')
  @Authorize('staff')
  @Summary('Return staff by id')
  @Returns(200, UserModel)
  getProfile(@Req() req: any) {
    return this.prisma.staff.findFirst({
      where: { id: req.user.id },
      include: {
        organization: true,
        categories: true,
      },
    });
  }

  @Get('/reports')
  @Authorize('staff')
  @Summary('Return list of reports related to staff')
  @Returns(200, UserModel)
  getReports(@Req() req: any) {
    return StaffService.getReports(req.user.id);
  }

  @Get('/report/:id')
  @Authorize('staff')
  @Summary('Return report by id')
  @Returns(200, ReportModel)
  getReportDetails(@Req() req: any, @PathParams() params: { id: string }) {
    return StaffService.getReportDetails(params.id, req.user.id);
  }

  @Post('/report/handle')
  @Authorize('staff')
  @Summary('Make report as handled or not handled')
  @Returns(200, ReportModel)
  handleReport(@Req() req: any, @BodyParams() params: { id: string }) {
    return StaffService.handleReport(params.id);
  }

  @Post('/report/reaction')
  @Authorize('staff')
  @Summary('add points to user report')
  @Returns(200, ReportModel)
  addReaction(
    @Req() req: any,
    @BodyParams() params: { id: string; reaction: number }
  ) {
    return StaffService.addReportReaction(params.id, params.reaction);
  }
}
