import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DiffModule } from "./diff/diff.module";

@Module({
  imports: [DiffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
