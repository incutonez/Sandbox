import { Module } from "@nestjs/common";
import { DiffController } from "@/diff/diff.controller";
import { DiffService } from "@/diff/diff.service";

@Module({
	controllers: [DiffController],
	providers: [DiffService],
})
export class DiffModule {}
