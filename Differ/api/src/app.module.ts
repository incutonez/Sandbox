import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DiffModule } from "./diff/diff.module";
import { RandomModule } from "./random/random.module";

@Module({
  imports: [DiffModule, RandomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
