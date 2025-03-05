import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppService } from "src/app.service";
import { AuthGuard } from "src/auth.guard";
import { AccessTokenEntity } from "src/models/access.token.entity";
import { ProfileEntity } from "src/models/profile.entity";
import { VersionEntity } from "src/models/version.entity";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private jwtService: JwtService) {}

	@Get("version")
	getVersion(): VersionEntity {
		return {
			version: process.env.npm_package_version as string,
		};
	}

	@Get("access-token")
	async getAccessToken(): Promise<AccessTokenEntity> {
		const response = await this.jwtService.signAsync(
			// Just a test user generated from jwt.io
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKVFQgMDQ3MTAxMTExIiwibmFtZSI6IkZveCBNdWxkZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.VVRekDEA-uQXGjvVOMEyySpO3D3s2zWPkEGs_mV-XZA",
			{
				secret: process.env.JWT_SECRET,
			},
		);
		return {
			accessToken: response,
		};
	}

	@UseGuards(AuthGuard)
	@Get("profile")
	getProfile(@Request() req): ProfileEntity {
		return req.user;
	}
}
