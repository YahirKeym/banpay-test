import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { CONTROLLER_PREFIX } from './commons/constants/controller.constants';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.enableVersioning({
		type: VersioningType.URI,
		prefix: CONTROLLER_PREFIX,
	});
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
