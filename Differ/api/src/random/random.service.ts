import { Injectable } from "@nestjs/common";
import { faker } from "@faker-js/faker";

@Injectable()
export class RandomService {
  getRandomData(page: number) {
    const data = [];
    const max = page < 20 ? 20 : 6;
    for (let i = 0; i < max; i++) {
      data.push({
        name: faker.person.fullName(),
      });
    }
    return data;
  }
}
