import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
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
	async getUsers(@Query('token') token: string) {
		return this.usersService.getUsers(token);
	}

	@Get(':id')
	async getUser(@Param('id') id: string, @Query('token') token: string) {
		return this.usersService.getUser(id, token);
	}

	@Post()
	async createUser(@Body() user: User, @Query('token') token: string) {
		return this.usersService.createUser(user, token);
	}

	@Put(':id')
	async updateUser(
		@Param('id') id: string,
		@Body() user: User,
		@Query('token') token: string,
	) {
		return this.usersService.updateUser(id, user, token);
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: string, @Query('token') token: string) {
		return this.usersService.deleteUser(id, token);
	}

	@Delete()
	async deleteUsers(@Query('token') token: string) {
		return this.usersService.deleteUsers(token);
	}

	@Post('/recovery')
	async recoveryUsers(@Query('token') token: string) {
		return this.usersService.recoveryUsers(token);
	}

	@Post('/login')
	async login(@Body() user: User) {
		return this.usersService.loginByEmail(user.email, user.password);
	}
}
