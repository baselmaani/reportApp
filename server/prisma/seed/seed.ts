import { Generator } from './Generator';
import { PrismaClient } from '@prisma/client';

async function main() {
  await Generator.resetDatabase();

  await Generator.generateCategories(10);
  // await Generator.generateRoles();
  await Generator.generateCities(1);

  await Generator.generateOrganizations(10);

  await Generator.generateFeed(10);
  //  generate events
  await Generator.generateEvents(20);

  await Generator.addCategoriesToDefaultOrg();

  await Generator.generateStaff();
  await Generator.generateRoles();
  await Generator.generateUser();
  await Generator.generateReports();
  await Generator.generateReportReactions();
  await Generator.addCategoriesToReport();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
