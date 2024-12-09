import { Module } from '@nestjs/common';
import { GhibliService } from './services/ghibli.service';
import { GhibliController } from './controller/ghibli.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [UsersModule],
	controllers: [GhibliController],
	providers: [GhibliService],
})
export class GhibliModule {}
