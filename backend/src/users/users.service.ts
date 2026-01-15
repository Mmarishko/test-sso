import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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
  passwordHash: string;
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
      password: 'secret123',
      // hash пароля 'secret123'
      passwordHash:
        '$2b$10$GkZzQxK9eY7u6vJ4XqW3eOaF8rT5sU7vW9xY1zA2bC3dE4fG5hI6j',
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
      passwordHash:
        '$2b$10$GkZzQxK9eY7u6vJ4XqW3eOaF8rT5sU7vW9xY1zA2bC3dE4fG5hI6j',
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

  async findOneById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async validateUser(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return { id: user.id, username: user.username };
    }
    return null;
  }
}
