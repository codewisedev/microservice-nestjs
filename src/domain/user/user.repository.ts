import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@domain/user/entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * This function finds and returns a user with a specific ID from a repository.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of a
   * user. It is used to search for a specific user in the database using the `findOne` method of the
   * `usersRepository`. The method returns a `Promise` that resolves to a `User` object if a user with
   * @returns The `findOne` method is returning a `Promise` that resolves to a `User` object. The
   * `User` object is retrieved from the `usersRepository` using the `findOne` method with the `id`
   * parameter as the search criteria. The `await` keyword is used to wait for the `findOne` method to
   * complete before returning the result.
   */
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
