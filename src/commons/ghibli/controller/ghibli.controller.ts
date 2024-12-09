import {
	CONTROLLER_PATHS,
	CONTROLLER_VERSION,
} from 'src/commons/constants/controller.constants';
import { GhibliService } from '../services/ghibli.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller({
	path: CONTROLLER_PATHS.GHIBLI,
	version: CONTROLLER_VERSION,
})
export class GhibliController {
	constructor(private readonly ghibliService: GhibliService) {}

	@Get()
	async getGhibli(@Query('token') token: string) {
		return this.ghibliService.getGhibliData(token);
	}
}
