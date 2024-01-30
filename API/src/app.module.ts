import { Module } from "@nestjs/common";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { UsersModule } from "src/users.module";

@Module({
	imports: [UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
