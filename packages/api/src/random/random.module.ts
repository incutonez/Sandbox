import { Module } from "@nestjs/common";
import { RandomController } from "src/random/random.controller";
import { RandomService } from "src/random/random.service";

@Module({
	controllers: [RandomController],
	providers: [RandomService],
})
export class RandomModule {}
