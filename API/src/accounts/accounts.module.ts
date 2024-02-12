import { Module } from "@nestjs/common";
import { AccountsController } from "src/accounts/accounts.controller";
import { AccountsMapper } from "src/accounts/accounts.mapper";
import { AccountsService } from "src/accounts/accounts.service";

@Module({
	controllers: [AccountsController],
	providers: [AccountsService, AccountsMapper],
})
export class AccountsModule {}
