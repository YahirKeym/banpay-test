import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { DATA_PERSISTENCE } from './config';
import { GhibliModule } from './commons/ghibli/ghibli.module';

const dataPersistence = DATA_PERSISTENCE;
console.log(dataPersistence);
const DataModule = dataPersistence === 'database' ? [DatabaseModule] : [];
@Module({
	imports: [ConfigModule.forRoot(), ...DataModule, UsersModule, GhibliModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
