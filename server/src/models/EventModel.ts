import { Event } from '@prisma/client';

export class EventModel implements Event {
  id: number;
  organizationId: number;
  title: string;
  content: string;
  images: string[];
  availableSeats: number;
  startAt: Date | null;
  endAt: Date | null;
  registerFrom: Date | null;
  registerTo: Date | null;
  createdAt: Date;
  updatedAt: Date;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  isUnlimited: boolean;
}
