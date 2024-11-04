import { Injectable } from "@nestjs/common";
import { ImagesMapper } from "src/images/images.mapper";

@Injectable()
export class ImagesService {
	constructor(private mapper: ImagesMapper) {
	}
}
