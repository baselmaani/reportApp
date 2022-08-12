import { PrismaClient, Report, reportReaction } from '@prisma/client';
import { faker } from '@faker-js/faker';

export class Generator {
  static async resetDatabase() {
    const prisma = new PrismaClient();
    await prisma.feedReaction.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.point.deleteMany();
    await prisma.reportReaction.deleteMany();
    await prisma.feed.deleteMany();
    await prisma.event.deleteMany();
    await prisma.report.deleteMany();
    await prisma.user.deleteMany();
    await prisma.staff.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.category.deleteMany();
    await prisma.city.deleteMany();
    await prisma.role.deleteMany();

    prisma.$disconnect();
  }

  static async generateCategories(limit: number) {
    const prisma = new PrismaClient();
    await prisma.category.deleteMany();
    let categories = [];
    categories.push({
      id: 1,
      name: 'General',
      image: faker.image.imageUrl(),
    });
    for (let i = 0; i < limit; i++) {
      categories.push({
        name: `${i} ${faker.commerce.department()}`,
        image: faker.image.imageUrl(),
      });
    }
    await prisma.category.createMany({ data: categories });
    prisma.$disconnect();
  }

  static async generateRoles() {
    const prisma = new PrismaClient();

    let roles = [
      {
        id: 1,
        name: 'User',
      },
      {
        id: 2,
        name: 'Admin',
      },
    ];
    await prisma.role.createMany({ data: roles });
    prisma.$disconnect();
  }

  static async generateCities(limit: number) {
    const prisma = new PrismaClient();
    await prisma.city.createMany({
      data: {
        id: 1,
        name: 'Trollhattan',
      },
    });
    prisma.$disconnect();
  }

  static async generateOrganizations(limit: number) {
    const prisma = new PrismaClient();
    let organizations = [];

    organizations.push({
      id: 1,
      name: 'Trollhättan Stad',
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      logo: 'https://www.trollhattan.se/globalassets/trollhattan-logo-46px.png',
      cityId: 1,
    });

    for (let i = 0; i < limit; i++) {
      organizations.push({
        name: `${i} ${faker.commerce.department()}`,
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        logo: faker.image.imageUrl(),
        cityId: 1,
      });
    }
    await prisma.organization.createMany({ data: organizations });
    prisma.$disconnect();
  }

  static async addCategoriesToDefaultOrg() {
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany();
    const toConnect = categories.map((c) => ({
      id: c.id,
    }));
    const organization = await prisma.organization.update({
      where: {
        id: 1,
      },
      data: {
        categories: {
          connect: toConnect,
        },
      },
    });

    prisma.$disconnect();
  }

  static async generateFeed(limit: number) {
    const prisma = new PrismaClient();
    const organizations = await prisma.organization.findMany();
    let feeds = [];
    for (let i = 0; i < limit; i++) {
      feeds.push({
        title: `${i} ${faker.commerce.department()}`,
        content: faker.lorem.paragraph(),
        images: [faker.image.imageUrl(), faker.image.imageUrl()],
        organizationId: faker.random.arrayElement(
          organizations.map((c) => c.id)
        ),
      });
    }
    await prisma.feed.createMany({ data: feeds });
    prisma.$disconnect();
  }

  static async generateEvents(limit: number) {
    const prisma = new PrismaClient();
    const organizations = await prisma.organization.findMany();
    let events = [];
    for (let i = 0; i < limit; i++) {
      events.push({
        title: `${i} ${faker.commerce.department()}`,
        content: faker.lorem.paragraph(),
        images: [faker.image.imageUrl(), faker.image.imageUrl()],
        organizationId: faker.random.arrayElement(
          organizations.map((c) => c.id)
        ),
        availableSeats: faker.random.number(),
        startAt: faker.date.future(),
        endAt: faker.date.future(),
        registerFrom: faker.date.past(),
        registerTo: faker.date.future(),
        address: faker.address.streetAddress(),
        longitude: parseFloat(faker.address.longitude()),
        latitude: parseFloat(faker.address.latitude()),
        isUnlimited: faker.random.boolean(),
      });
    }
    await prisma.event.createMany({ data: events });
    prisma.$disconnect();
  }

  static async generateStaff() {
    const prisma = new PrismaClient();
    await prisma.staff.create({
      data: {
        id: 1,
        name: 'Trollhättan Stad Admin',
        email: 'mohammedmaani@hotmail.com',
        tel: '+4670-1234567',
        organizationId: 1,
        password:
          '$2b$10$OIiw3r.e2yGOlCzzQDI3Gu8CAxEQv.hKR19u2onuJz.nNS4tkhRfq',
      },
    });
    prisma.$disconnect();
  }

  static async generateUser(limit = 20) {
    const prisma = new PrismaClient();
    let users = [];

    users.push({
      id: 1,
      name: 'Trollhättan Stad Admin',
      email: 'mohammedmaani@hotmail.com',
      tel: '+4670-1234567',
      password: '$2b$10$OIiw3r.e2yGOlCzzQDI3Gu8CAxEQv.hKR19u2onuJz.nNS4tkhRfq',
      roleId: 1,
    });
    for (let i = 2; i < limit; i++) {
      users.push({
        id: i,
        name: 'Trollhättan Stad Admin',
        email: 'mohammedmaani@hotmail.com',
        tel: '+4670-1234567',
        password:
          '$2b$10$OIiw3r.e2yGOlCzzQDI3Gu8CAxEQv.hKR19u2onuJz.nNS4tkhRfq',
        roleId: 1,
      });
    }

    await prisma.user.createMany({
      data: users,
    });

    prisma.$disconnect();
  }

  static async generateReports() {
    const prisma = new PrismaClient();
    const reports: Report[] = [];
    for (let i = 0; i < 10; i++) {
      reports.push({
        id: i,
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        images: [faker.image.imageUrl(), faker.image.imageUrl()],
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
        userId: 1,
        isPublic: faker.datatype.boolean(),
        isHandled: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        cityId: 1,
      });
    }
    await prisma.report.createMany({ data: reports });
    prisma.$disconnect();
  }

  static async generateReportReactions() {
    const prisma = new PrismaClient();
    const reports = await prisma.report.findMany();
    const users = await prisma.user.findMany();
    let reactions: reportReaction[] = [];
    for (let i = 0; i < 100; i++) {
      reactions.push({
        id: i,
        reportId: faker.random.arrayElement(reports.map((c) => c.id)),
        userId: faker.random.arrayElement(users.map((c) => c.id)),
        value:
          faker.datatype.number({
            min: -10,
            max: 10,
          }) / 10,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      });
    }

    await prisma.reportReaction.createMany({ data: reactions });

    await prisma.$disconnect();
  }

  static async addCategoriesToReport() {
    const prisma = new PrismaClient();
    const reports = await prisma.report.findMany();
    const toConnect = reports.map((c) => ({
      id: c.id,
    }));
    await prisma.category.update({
      where: {
        id: 1,
      },
      data: {
        reports: {
          connect: toConnect,
        },
      },
    });

    prisma.$disconnect();
  }
}
