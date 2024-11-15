import { Model } from "sequelize-typescript";

// TODOJEF: Extend from this and in mappers, do a check to see if we have an instance, then get the plain version
export class BaseModel extends Model {
	getPlain() {
		return this.get(({
			plain: true,
		}));
	}
}
