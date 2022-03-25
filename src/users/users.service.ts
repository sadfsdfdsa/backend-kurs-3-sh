import { Injectable } from '@nestjs/common';

export type User = {
  email: string;
  firstName: string;
  id: number;
  isAdmin?: boolean;
  password: string;
  phone: string;
  secondName: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        email: 'asd@asd.com',
        password: 'asd',
        firstName: 'Artem',
        secondName: 'Shuvaev',
        phone: '+723458134',
        isAdmin: true,
      },
    ];
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
