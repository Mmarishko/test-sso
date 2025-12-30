import { Injectable } from '@nestjs/common';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_CONTENT = 'MANAGE_CONTENT',
}

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      username: 'marina',
      email: 'mayrishka.x86@gmail.com',
      password: '123456',
      role: UserRole.ADMIN,
      permissions: [Permission.READ, Permission.WRITE, Permission.DELETE],
      isActive: true,
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      username: 'guest',
      email: 'guest@guest.ru',
      password: 'guess',
      role: UserRole.USER,
      permissions: [Permission.READ, Permission.MANAGE_CONTENT],
      isActive: true,
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
