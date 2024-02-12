import { Injectable } from "@nestjs/common";
import { AccountsMapper } from "src/accounts/accounts.mapper";

@Injectable()
export class AccountsService {
	constructor(private mapper: AccountsMapper) {}

	async getAccounts() {}
}
