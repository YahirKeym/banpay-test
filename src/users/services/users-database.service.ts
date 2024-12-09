import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersDatabaseService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>,
	) {}

	async getUsers() {
		return this.userRepository.find();
	}

	async getUser(id: string) {
		return this.userRepository.findOne({ where: { id } });
	}

	async createUser(user: CreateUserDto) {
		return this.userRepository.save(user);
	}

	async updateUser(id: string, user: CreateUserDto) {
		return this.userRepository.update(id, user);
	}

	async deleteUser(id: string) {
		return this.userRepository.update(id, { isDeleted: true });
	}

	async restoreUser(id: string) {
		return this.userRepository.update(id, { isDeleted: false });
	}

	async deleteUsers() {
		return this.userRepository.delete({ isDeleted: true });
	}

	async restoreUsers() {
		return this.userRepository.update(
			{ isDeleted: true },
			{ isDeleted: false },
		);
	}
}
