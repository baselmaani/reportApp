import { Report } from '@prisma/client';

export class ReportModel implements Report {
  images: string[];
  isPublic: boolean;
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  longitude: number;
  latitude: number;
}

export class ReportInput {
  title: string;
  description: string;
  categories: number[];
  longitude: number;
  latitude: number;
  images: string[];
  isPublic: boolean;
}
