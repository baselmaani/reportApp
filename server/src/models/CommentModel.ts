import { Comment } from '@prisma/client';

export class CommentModel implements Comment {
  id: number;
  userId: number;
  content: string;
  feedId: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class CommentInput {
  content: string;
  feedId: number;
  images: string[];
}
