import { Feed } from '@prisma/client';

export class FeedModel implements Feed {
  content: string;
  images: string[];
  organizationId: number;
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  longitude: number;
  latitude: number;
}

export class FeedInput {
  content: string;
  images: string[];
  title: string;
}

export class FeedReactionInput {
  id: number;
  feedId: number;
  value: string;
}
