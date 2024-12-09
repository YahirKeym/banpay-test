import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { users } from '../static/users';

@Injectable()
export class UsersService {
	private users: User[] = [];
	private readonly dataPersistence = process.env.DATA_PERSISTENCE;

	private roles: string[] = [
		'admin',
		'films',
		'people',
		'locations',
		'species',
		'vehicles',
	];

	constructor() {
		this.users = users;
	}

	async getUsers() {
		const users = this.users.filter((user) => !user.isDeleted);
		return {
			users: users,
			code: 'USERS_FETCHED',
			statusCode: 200,
		};
	}

	async getUser(id: string) {
		const user = this.users.find((user) => user.id === id);
		if (!user) {
			throw new BadRequestException({
				message: 'User not found',
				code: 'USER_NOT_FOUND',
				statusCode: 400,
			});
		}
		return {
			user: user,
			code: 'USER_FETCHED',
			statusCode: 200,
		};
	}

	async createUser(user: CreateUserDto) {
		if (this.users.find((userData) => userData.email === user.email)) {
			throw new BadRequestException({
				message: 'User already exists',
				code: 'USER_ALREADY_EXISTS',
				statusCode: 400,
			});
		}
		if (!this.roles.includes(user.role)) {
			throw new BadRequestException({
				message: 'Invalid role',
				code: 'INVALID_ROLE',
				statusCode: 400,
			});
		}
		const userData = {
			id: this.generateId(),
			...user,
			role: user.role,
			isDeleted: false,
			token: this.generateToken(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		this.users.push(userData);

		return {
			user: userData,
			code: 'USER_CREATED',
			statusCode: 201,
		};
	}

	async updateUser(id: string, user: CreateUserDto) {
		const userIndex = this.users.findIndex(
			(userData) => userData.id === id && !userData.isDeleted,
		);
		if (userIndex === -1) {
			throw new BadRequestException({
				message: 'User not found',
				code: 'USER_NOT_FOUND',
				statusCode: 400,
			});
		}

		if (
			this.users.find(
				(userData) =>
					userData.email === user.email && userData.id !== id,
			)
		) {
			throw new BadRequestException({
				message: 'User already exists',
				code: 'USER_ALREADY_EXISTS',
				statusCode: 400,
			});
		}

		this.users[userIndex] = {
			...this.users[userIndex],
			...user,
			updatedAt: new Date(),
		};
		return {
			user: this.users[userIndex],
			code: 'USER_UPDATED',
			statusCode: 200,
		};
	}

	async deleteUser(id: string) {
		const userIndex = this.users.findIndex(
			(userData) => userData.id === id && !userData.isDeleted,
		);
		if (userIndex === -1) {
			throw new BadRequestException({
				message: 'User not found',
				code: 'USER_NOT_FOUND',
				statusCode: 400,
			});
		}
		this.users[userIndex].isDeleted = true;
		return {
			user: this.users[userIndex],
			code: 'USER_DELETED',
			statusCode: 200,
		};
	}

	async deleteUsers() {
		this.users.forEach((user) => {
			if (!user.isDeleted) {
				user.isDeleted = true;
			}
		});
		return {
			users: this.users,
			code: 'USERS_DELETED',
			statusCode: 200,
		};
	}

	async recoveryUsers() {
		this.users.forEach((user) => {
			user.isDeleted = false;
		});
		return {
			users: this.users,
			code: 'USERS_RECOVERED',
			statusCode: 200,
		};
	}

	public async reactivateUser(id: string) {
		const userIndex = this.users.findIndex(
			(user) => user.id === id && user.isDeleted,
		);
		if (userIndex === -1) {
			throw new BadRequestException({
				message: 'User not found',
				code: 'USER_NOT_FOUND',
				statusCode: 400,
			});
		}
		this.users[userIndex].isDeleted = false;
		return {
			user: this.users[userIndex],
			code: 'USER_REACTIVATED',
			statusCode: 200,
		};
	}

	public async loginByToken(token: string) {
		const userData = this.users.find((user) => user.token === token);
		if (!userData) {
			throw new BadRequestException({
				message: 'User not found',
				code: 'USER_NOT_FOUND',
				statusCode: 400,
			});
		}
		return userData;
	}

	public async loginByEmail(email: string, password: string) {
		const userData = this.users.find((user) => user.email === email);
		if (!userData) {
			throw new BadRequestException({
				message: 'User not found',
				code: 'USER_NOT_FOUND',
				statusCode: 400,
			});
		}
		if (userData.password !== password) {
			throw new BadRequestException({
				message: 'Invalid password',
				code: 'INVALID_PASSWORD',
				statusCode: 400,
			});
		}
		return userData;
	}

	private generateToken() {
		return this.uuidv4();
	}

	private generateId() {
		return this.uuidv4();
	}

	private uuidv4() {
		const uuid = `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.replace(
			/[x]/g,
			(c) => {
				const r = (Math.random() * 16) | 0;
				const v = c === 'x' ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			},
		);

		return uuid;
	}
}
