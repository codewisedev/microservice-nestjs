import { Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/user/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findAll() {
    return this.userRepository.findAll();
  }

  addMoney() {
    console.log('add money!!');
  }
}
