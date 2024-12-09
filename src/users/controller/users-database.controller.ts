import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
} from '@nestjs/common';
import {
	CONTROLLER_PATHS,
	CONTROLLER_VERSION,
} from 'src/commons/constants/controller.constants';
import { UsersDatabaseService } from '../services/users-database.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller({
	path: CONTROLLER_PATHS.USERS,
	version: CONTROLLER_VERSION,
})
export class UsersDatabaseController {
	constructor(private readonly usersDatabaseService: UsersDatabaseService) {}

	@Get()
	async getUsers() {
		return this.usersDatabaseService.getUsers();
	}

	@Get(':id')
	async getUser(@Param('id') id: string) {
		return this.usersDatabaseService.getUser(id);
	}

	@Post()
	async createUser(@Body() user: CreateUserDto) {
		return this.usersDatabaseService.createUser(user);
	}

	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
		return this.usersDatabaseService.updateUser(id, user);
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: string) {
		return this.usersDatabaseService.deleteUser(id);
	}

	@Delete()
	async deleteUsers() {
		return this.usersDatabaseService.deleteUsers();
	}

	@Patch(':id')
	async restoreUser(@Param('id') id: string) {
		return this.usersDatabaseService.restoreUser(id);
	}

	@Patch()
	async restoreUsers() {
		return this.usersDatabaseService.restoreUsers();
	}
}
