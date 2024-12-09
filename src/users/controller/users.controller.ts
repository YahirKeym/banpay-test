import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import {
	CONTROLLER_PATHS,
	CONTROLLER_VERSION,
} from 'src/commons/constants/controller.constants';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';

@Controller({
	path: CONTROLLER_PATHS.USERS,
	version: CONTROLLER_VERSION,
})
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async getUsers() {
		return this.usersService.getUsers();
	}

	@Get(':id')
	async getUser(@Param('id') id: string) {
		return this.usersService.getUser(id);
	}

	@Post()
	async createUser(@Body() user: User) {
		return this.usersService.createUser(user);
	}

	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() user: User) {
		return this.usersService.updateUser(id, user);
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id);
	}

	@Delete()
	async deleteUsers() {
		return this.usersService.deleteUsers();
	}

	@Post('/recovery')
	async recoveryUsers() {
		return this.usersService.recoveryUsers();
	}

	@Post('/login')
	async login(@Body() user: User) {
		return this.usersService.loginByEmail(user.email, user.password);
	}
}
