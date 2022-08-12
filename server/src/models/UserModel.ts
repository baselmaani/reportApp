import { Organization, Staff, User } from '@prisma/client';

export class UserModel implements User {
  password: string;
  tel: string | null;
  createdAt: Date;
  updatedAt: Date;
  cityId: number | null;
  image: string | null;
  roleId: number;
  id: number;
  name: string;
  email: string;
}

export class StaffModel implements Staff {
  organizationId: number;
  id: number;
  name: string;
  email: string;
  password: string;
  tel: string | null;
  createdAt: Date;
  updatedAt: Date;
  organization: Organization | undefined;
}

export class UserInput {
  name: string;
  email: string;
  password: string;
  tel: string;
}

export class GenerateTokenInput {
  id: number;
  name: string;
  email: string;
  tel: string;
  organizationId: number | undefined;
}

export class TokenResultType {
  token: string;
}
