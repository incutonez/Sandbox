import { Module } from "@nestjs/common";
import { RandomController } from "@/random/random.controller";
import { RandomService } from "@/random/random.service";

@Module({
	controllers: [RandomController],
	providers: [RandomService],
})
export class RandomModule {}
