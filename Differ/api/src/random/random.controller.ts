import { Controller, Get, Query } from "@nestjs/common";
import { RandomService } from "./random.service";

@Controller("random")
export class RandomController {
  constructor(private readonly service: RandomService) {}

  @Get()
  getDiff(@Query("page") page: number) {
    return this.service.getRandomData(page);
  }
}
