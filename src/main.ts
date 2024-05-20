import { AppModule } from "@/app.module";
import { Env } from "@/env";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get<ConfigService<Env, true>>(ConfigService);
	const port = configService.get("PORT");

	app.enableCors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true,
	});
	await app.listen(port);
}
bootstrap();
