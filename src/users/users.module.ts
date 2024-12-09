import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { userProviders } from './provider/user.provider';
import { UsersDatabaseController } from './controller/users-database.controller';
import { UsersDatabaseService } from './services/users-database.service';
import { DATA_PERSISTENCE } from '../config';

const dataPersistence = DATA_PERSISTENCE;
const UserProviders = dataPersistence === 'database' ? [...userProviders] : [];
const controller =
	dataPersistence === 'database' ? UsersDatabaseController : UsersController;
const service =
	dataPersistence === 'database' ? UsersDatabaseService : UsersService;

@Module({
	imports: [],
	controllers: [controller],
	providers: [service, ...UserProviders],
	exports: [service],
})
export class UsersModule {}
