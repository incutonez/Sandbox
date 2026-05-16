import { Module } from "@nestjs/common";
import { AccountsController } from "@/accounts/accounts.controller";
import { AccountsMapper } from "@/accounts/accounts.mapper";
import { AccountsService } from "@/accounts/accounts.service";

@Module({
	controllers: [AccountsController],
	providers: [AccountsService, AccountsMapper],
})
export class AccountsModule {}
