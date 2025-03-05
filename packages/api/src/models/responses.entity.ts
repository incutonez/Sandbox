import { GetResponseModel } from "src/models/base.list.entity";
import { TreeChangeModel } from "src/models/diff.entity";
import { LeagueMatchEntity } from "src/models/league.match.entity";
import { UserEntity } from "src/models/user.entity";

export class TreeChangeResponseModel extends GetResponseModel<TreeChangeModel>(TreeChangeModel) {}
export class UserResponseModel extends GetResponseModel<UserEntity>(UserEntity) {}
export class LeagueMatchResponseModel extends GetResponseModel<LeagueMatchEntity>(LeagueMatchEntity) {}
export class BulkResponse {
	index: number;
	message: string[];
}
