import { ImageModel } from "src/db/models/ImageModel";
import { ImageEntity } from "src/models/image.entity";

export class ImagesMapper {
	modelToViewModel({ id, contents, created_date }: ImageModel): ImageEntity {
		return {
			id,
			contents,
			createdDate: created_date,
		};
	}
}
