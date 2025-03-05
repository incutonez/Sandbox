import { Controller, Get } from "@nestjs/common";
import { AccountsService } from "src/accounts/accounts.service";

@Controller("accounts")
export class AccountsController {
	constructor(private readonly service: AccountsService) {}

	@Get()
	async getAccounts() {}
}
