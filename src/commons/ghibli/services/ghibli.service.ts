import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class GhibliService {
	constructor(private readonly usersService: UsersService) {}

	async getGhibliData(token: string) {
		const user = await this.usersService.loginByToken(token);
		if (user.role === 'admin') {
			throw new BadRequestException({
				message: 'User not found',
				code: 'USER_NOT_FOUND',
				statusCode: 400,
			});
		}
		const ghibliData = await this.fetchGhibliData(user.role);

		return {
			type: user.role,
			ghibli: ghibliData,
			status: HttpStatus.OK,
		};
	}

	private async fetchGhibliData(role: string) {
		const response = await axios(`https://ghibliapi.vercel.app/${role}`);
		return response.data;
	}
}
