import { Module } from '@nestjs/common';
import { databaseProviders } from './datasource';

@Module({
	providers: [...databaseProviders],
	exports: [...databaseProviders],
})
export class DatabaseModule {}
