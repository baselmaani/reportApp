import { reportReaction } from '@prisma/client';

export class ReportReactionModel implements reportReaction {
  id: number;
  userId: number;
  reportId: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ReportReactionInput {
  value: number;
  reportId: number;
}
