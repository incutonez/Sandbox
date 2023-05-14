import { Controller, Get } from "@nestjs/common";
import { DiffService } from "./diff.service";

@Controller("diff")
export class DiffController {
  constructor(private readonly service: DiffService) {}

  @Get()
  getDiff() {
    return this.service.getDiff();
  }
}
