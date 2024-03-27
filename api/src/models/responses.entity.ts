import { GetResponseModel } from "src/models/base.list.entity";
import { TreeChangeModel } from "src/models/diff.entity";
import { UserEntity } from "src/models/user.entity";

export class TreeChangeResponseModel extends GetResponseModel<TreeChangeModel>(TreeChangeModel) {}
export class UserResponseModel extends GetResponseModel<UserEntity>(UserEntity) {}
