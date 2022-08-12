import { PrismaService } from './PrismaService';

export class StaffService {
  static async getReports(staffId: number) {
    const prisma = new PrismaService();
    const staffInfo = await prisma.staff.findFirst({
      where: {
        id: staffId,
      },
      include: {
        organization: {
          include: {
            categories: true,
          },
        },
      },
    });
    const categories = staffInfo ? staffInfo.organization.categories : [];
    const reports = await prisma.report.findMany({
      where: {
        categories: {
          some: {
            id: {
              in: categories.map((category) => category.id),
            },
          },
        },
      },
    });
    console.log(reports, 'reports------------------------');
    await prisma.$disconnect();

    return reports;
  }

  static async getReportDetails(reportId: string, userId: number) {
    const prisma = new PrismaService();
    const staffInfo = await prisma.staff.findFirst({
      where: {
        id: userId,
      },
      include: {
        organization: {
          include: {
            categories: true,
          },
        },
      },
    });
    const categories = staffInfo ? staffInfo.organization.categories : [];
    const report = await prisma.report.findFirst({
      where: { id: parseInt(reportId) },
      include: {
        categories: {
          where: {
            id: {
              in: categories.map((c) => c.id),
            },
          },
        },
        reportReactions: true,
      },
    });
    await prisma.$disconnect();

    return report;
  }

  static async handleReport(id: string) {
    const prisma = new PrismaService();
    const report = await prisma.report.findFirst({
      where: { id: parseInt(id) },
    });
    if (report) {
      const newHandle = !report.isHandled;

      await prisma.report.update({
        where: { id: parseInt(id) },
        data: {
          isHandled: newHandle,
        },
      });
      return newHandle;
    }
    return null;
  }

  static async addReportReaction(id: string, reaction: number) {
    const prisma = new PrismaService();
    const report = await prisma.report.findFirst({
      where: { id: parseInt(id) },
    });
    if (report) {
      const toAddPoints = process.env.ADD_REACTION_POINTS || 5;
      await prisma.point.create({
        data: {
          userId: report.userId,
          value: reaction * parseFloat(toAddPoints.toString()),
          sourceType: 'reaction',
        },
      });
    }
  }
}
