import { Module } from "@nestjs/common";
import { DiffController } from "src/diff/diff.controller";
import { DiffService } from "src/diff/diff.service";

@Module({
	controllers: [DiffController],
	providers: [DiffService],
})
export class DiffModule {}
