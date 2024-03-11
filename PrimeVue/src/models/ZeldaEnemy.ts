import { IsNumber } from "class-validator";
import {
	ZeldaEnemies,
	ZeldaEnemiesArmos,
	ZeldaEnemiesBubble,
	ZeldaEnemiesBubbleBlue,
	ZeldaEnemiesBubbleRed,
	ZeldaEnemiesDarknut,
	ZeldaEnemiesDarknutBlue,
	ZeldaEnemiesGel,
	ZeldaEnemiesGelBlue,
	ZeldaEnemiesGhini,
	ZeldaEnemiesGibdo,
	ZeldaEnemiesGoriya,
	ZeldaEnemiesGoriyaBlue,
	ZeldaEnemiesKeese,
	ZeldaEnemiesKeeseBlue,
	ZeldaEnemiesKeeseRed,
	ZeldaEnemiesLanmola,
	ZeldaEnemiesLanmolaBlue,
	ZeldaEnemiesLeever,
	ZeldaEnemiesLeeverBlue,
	ZeldaEnemiesLikeLike,
	ZeldaEnemiesLynel,
	ZeldaEnemiesLynelBlue,
	ZeldaEnemiesMoblin,
	ZeldaEnemiesMoblinBlue,
	ZeldaEnemiesMoldorm,
	ZeldaEnemiesMoldormBlue,
	ZeldaEnemiesOctorok,
	ZeldaEnemiesOctorokBlue,
	ZeldaEnemiesPatra,
	ZeldaEnemiesPatraHead,
	ZeldaEnemiesPeahat,
	ZeldaEnemiesPolsVoice,
	ZeldaEnemiesRock,
	ZeldaEnemiesRope,
	ZeldaEnemiesRopeBlue,
	ZeldaEnemiesStalfos,
	ZeldaEnemiesTektite,
	ZeldaEnemiesTektiteBlue,
	ZeldaEnemiesTrap,
	ZeldaEnemiesVire,
	ZeldaEnemiesWallmaster,
	ZeldaEnemiesWizzrobe,
	ZeldaEnemiesWizzrobeBlue,
	ZeldaEnemiesZol, ZeldaEnemiesZolGray, ZeldaEnemiesZolGreen, ZeldaEnemiesZora,
} from "@/enums/ZeldaNPCs";
import {
	ZeldaWorldColorsBlack,
	ZeldaWorldColorsBlue,
	ZeldaWorldColorsBlueLight,
	ZeldaWorldColorsGray, ZeldaWorldColorsGreenDark, ZeldaWorldColorsGreenLight,
	ZeldaWorldColorsLime,
	ZeldaWorldColorsOrange,
	ZeldaWorldColorsRed,
	ZeldaWorldColorsRedPure,
	ZeldaWorldColorsTeal,
	ZeldaWorldColorsTealDark,
	ZeldaWorldColorsTealLight,
	ZeldaWorldColorsWhitePure,
} from "@/enums/ZeldaWorldColors";
import { ZeldaTargetColor } from "@/models/ZeldaTargetColor";
import { IZeldaWorldObjectConfig, ZeldaWorldObject } from "@/models/ZeldaWorldObject";
import { isEmpty } from "@/utils/common";

let WhiteBlack = [ZeldaWorldColorsWhitePure, ZeldaWorldColorsBlack];
const WhiteBlackRed = [ZeldaWorldColorsWhitePure, ZeldaWorldColorsBlack, ZeldaWorldColorsRedPure];
/**
 * For the most part, the coloring is by having 2 different color palettes...
 * a red/orange for the standard version, and blue/light blue for the harder version of the enemy.
 */
const EnemyNormal = WhiteBlackRed.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsRedPure) {
		config.Value = ZeldaWorldColorsRed;
	}
	else if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsOrange;
	}
	return config;
});
const EnemyHard = WhiteBlackRed.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsRedPure) {
		config.Value = ZeldaWorldColorsBlue;
	}
	else if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsBlueLight;
	}
	return config;
});
/* PolsVoice is a little more unique, as its RedPure color actually changes based on the suit that
 * Link is wearing... e.g.
 * Green Ring = Lime (default)
 * Blue Ring = PurpleLight
 * Red Ring = Red */
const PolsVoice = WhiteBlackRed.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsRed;
	}
	else if (color === ZeldaWorldColorsWhitePure) {
		config.Value = ZeldaWorldColorsOrange;
	}
	else if (color === ZeldaWorldColorsRedPure) {
		config.Value = ZeldaWorldColorsLime;
	}
	return config;
});
// The harder version of the moblin has all 3 different colors instead of the standard 2 changes
const MoblinHarder = WhiteBlackRed.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsRedPure) {
		config.Value = ZeldaWorldColorsBlack;
	}
	else if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsTeal;
	}
	else if (color === ZeldaWorldColorsWhitePure) {
		config.Value = ZeldaWorldColorsRed;
	}
	return config;
});
const Zora = WhiteBlack.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsWhitePure) {
		config.Value = ZeldaWorldColorsRed;
	}
	else if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsTeal;
	}
	return config;
});
const GelBlue = WhiteBlack.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsWhitePure) {
		config.Value = ZeldaWorldColorsTealLight;
	}
	else if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsTealDark;
	}
	return config;
});
const KeeseBlue = WhiteBlack.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsWhitePure) {
		config.Value = ZeldaWorldColorsBlueLight;
	}
	else if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsBlue;
	}
	return config;
});
const KeeseRed = WhiteBlack.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsWhitePure) {
		config.Value = ZeldaWorldColorsOrange;
	}
	else if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsRed;
	}
	return config;
});
const ZolGray = WhiteBlack.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsGray;
	}
	return config;
});
const ZolGreen = WhiteBlack.map((color) => {
	const config = ZeldaTargetColor.create({
		Target: color,
	});
	if (color === ZeldaWorldColorsWhitePure) {
		config.Value = ZeldaWorldColorsGreenLight;
	}
	else if (color === ZeldaWorldColorsBlack) {
		config.Value = ZeldaWorldColorsGreenDark;
	}
	return config;
});
WhiteBlack = WhiteBlack.map((color) => {
	return {
		Target: color,
	};
});

export interface IZeldaEnemyConfig extends IZeldaWorldObjectConfig {
	Speed?: number;
	Health?: number;
	TouchDamage?: number;
	HealthModifier?: number;
	WeaponDamage?: number;
}

export class ZeldaEnemy extends ZeldaWorldObject {
	@IsNumber()
	Speed?: number;

	@IsNumber()
	Health?: number;

	@IsNumber()
	TouchDamage?: number;

	@IsNumber()
	HealthModifier?: number;

	@IsNumber()
	WeaponDamage?: number;

	get imageType() {
		return "Enemies";
	}

	get enumCollection() {
		return ZeldaEnemies;
	}

	setDefaultValues() {
		let Health;
		let Speed;
		let TouchDamage;
		let HealthModifier;
		let WeaponDamage;
		let Colors = WhiteBlackRed;
		switch (this.Type) {
			case ZeldaEnemiesArmos:
				Colors = EnemyNormal;
				Health = 6;
				TouchDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesBubble:
				// TODO: Need to get proper colors for regular Bubble
				Colors = EnemyNormal;
				Health = 0;
				TouchDamage = 0;
				Speed = 3;
				break;
			case ZeldaEnemiesBubbleRed:
				Colors = EnemyNormal;
				Health = 0;
				TouchDamage = 0;
				Speed = 3;
				break;
			case ZeldaEnemiesBubbleBlue:
				Colors = EnemyHard;
				Health = 0;
				TouchDamage = 0;
				Speed = 3;
				break;
			case ZeldaEnemiesDarknut:
				Colors = EnemyNormal;
				Health = 8;
				TouchDamage = 2;
				Speed = 3;
				break;
			case ZeldaEnemiesDarknutBlue:
				Colors = EnemyHard;
				Health = 16;
				TouchDamage = 4;
				Speed = 5;
				break;
			case ZeldaEnemiesGel:
				Colors = WhiteBlack;
				Health = 2;
				TouchDamage = 1;
				Speed = 1;
				break;
			case ZeldaEnemiesGelBlue:
				Colors = GelBlue;
				Health = 2;
				TouchDamage = 1;
				Speed = 1;
				break;
			case ZeldaEnemiesGhini:
				Colors = EnemyHard;
				Health = 22;
				TouchDamage = 1;
				Speed = 2;
				break;
			case ZeldaEnemiesGibdo:
				Colors = EnemyHard;
				Health = 12;
				TouchDamage = 4;
				Speed = 3;
				HealthModifier = 0.75;
				break;
			case ZeldaEnemiesGoriya:
				Colors = EnemyNormal;
				Health = 6;
				TouchDamage = 1;
				Speed = 3;
				WeaponDamage = 2;
				break;
			case ZeldaEnemiesGoriyaBlue:
				Colors = EnemyHard;
				Health = 10;
				TouchDamage = 2;
				Speed = 3;
				WeaponDamage = 2;
				break;
			case ZeldaEnemiesKeese:
				Colors = WhiteBlack;
				Health = 2;
				TouchDamage = 1;
				Speed = 4;
				break;
			case ZeldaEnemiesKeeseBlue:
				Colors = KeeseBlue;
				Health = 2;
				TouchDamage = 1;
				Speed = 4;
				break;
			case ZeldaEnemiesKeeseRed:
				Colors = KeeseRed;
				Health = 2;
				TouchDamage = 1;
				Speed = 4;
				break;
			case ZeldaEnemiesLanmola:
				Colors = EnemyNormal;
				Health = 8;
				HealthModifier = 0;
				TouchDamage = 4;
				Speed = 4;
				break;
			case ZeldaEnemiesLanmolaBlue:
				Colors = EnemyHard;
				Health = 8;
				HealthModifier = 0;
				TouchDamage = 4;
				Speed = 6;
				break;
			case ZeldaEnemiesLeever:
				Colors = EnemyNormal;
				Health = 4;
				TouchDamage = 1;
				Speed = 4;
				break;
			case ZeldaEnemiesLeeverBlue:
				Colors = EnemyHard;
				Health = 8;
				TouchDamage = 2;
				Speed = 4;
				break;
			case ZeldaEnemiesLikeLike:
				Colors = EnemyNormal;
				Health = 20;
				TouchDamage = 2;
				Speed = 3;
				break;
			case ZeldaEnemiesLynel:
				Colors = EnemyNormal;
				Health = 8;
				TouchDamage = 2;
				Speed = 3;
				WeaponDamage = 2;
				break;
			case ZeldaEnemiesLynelBlue:
				Colors = EnemyHard;
				Health = 12;
				TouchDamage = 4;
				Speed = 3;
				WeaponDamage = 4;
				break;
			case ZeldaEnemiesMoblin:
				Colors = EnemyNormal;
				Health = 4;
				TouchDamage = 1;
				Speed = 3;
				WeaponDamage = 1;
				break;
			case ZeldaEnemiesMoblinBlue:
				Colors = MoblinHarder;
				Health = 6;
				TouchDamage = 1;
				Speed = 3;
				WeaponDamage = 1;
				break;
			case ZeldaEnemiesMoldorm:
				Colors = EnemyNormal;
				Health = 10;
				HealthModifier = 0;
				TouchDamage = 1;
				Speed = 1;
				break;
				// TODO: Is there a blue Moldorm?
			case ZeldaEnemiesMoldormBlue:
				Colors = EnemyHard;
				break;
			case ZeldaEnemiesOctorok:
				Colors = EnemyNormal;
				Health = 2;
				TouchDamage = 1;
				WeaponDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesOctorokBlue:
				Colors = EnemyHard;
				Health = 4;
				TouchDamage = 1;
				WeaponDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesPatra:
				Colors = EnemyHard;
				Health = 20;
				TouchDamage = 4;
				Speed = 3;
				break;
			case ZeldaEnemiesPatraHead:
				Colors = EnemyNormal;
				Health = 20;
				TouchDamage = 4;
				Speed = 3;
				break;
			case ZeldaEnemiesPeahat:
				Colors = EnemyNormal;
				Health = 4;
				TouchDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesPolsVoice:
				Colors = PolsVoice;
				Health = 20;
				TouchDamage = 4;
				Speed = 3;
				break;
			case ZeldaEnemiesRock:
				Colors = EnemyNormal;
				Health = 0;
				TouchDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesRope:
				Colors = EnemyNormal;
				Health = 2;
				TouchDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesRopeBlue:
				Colors = EnemyHard;
				Health = 8;
				TouchDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesStalfos:
				Colors = EnemyNormal;
				Health = 4;
				TouchDamage = 0.25;
				WeaponDamage = 0.25;
				Speed = 3;
				break;
			case ZeldaEnemiesTektite:
				Colors = EnemyNormal;
				Health = 2;
				TouchDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesTektiteBlue:
				Colors = EnemyHard;
				Health = 2;
				TouchDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesTrap:
				Colors = EnemyHard;
				Health = 0;
				TouchDamage = 1;
				Speed = 3;
				break;
			case ZeldaEnemiesVire:
				Colors = EnemyHard;
				Health = 2;
				TouchDamage = 2;
				Speed = 3;
				break;
			case ZeldaEnemiesWallmaster:
				Colors = EnemyHard;
				Health = 6;
				TouchDamage = 1;
				Speed = 1;
				break;
			case ZeldaEnemiesWizzrobe:
				Colors = EnemyNormal;
				Health = 6;
				TouchDamage = 2;
				WeaponDamage = 8;
				Speed = 0;
				break;
			case ZeldaEnemiesWizzrobeBlue:
				Colors = EnemyHard;
				Health = 10;
				TouchDamage = 4;
				WeaponDamage = 4;
				Speed = 5;
				break;
			case ZeldaEnemiesZol:
				Colors = WhiteBlack;
				Health = 2;
				TouchDamage = 2;
				Speed = 1;
				break;
			case ZeldaEnemiesZolGray:
				Colors = ZolGray;
				Health = 2;
				TouchDamage = 2;
				Speed = 1;
				break;
			case ZeldaEnemiesZolGreen:
				Colors = ZolGreen;
				Health = 2;
				TouchDamage = 2;
				Speed = 1;
				break;
			case ZeldaEnemiesZora:
				Colors = Zora;
				Health = 4;
				TouchDamage = 1;
				WeaponDamage = 1;
				Speed = 0;
				break;
			default:
				break;
		}
		Health = this.Health ?? Health;
		HealthModifier = this.HealthModifier ?? HealthModifier;
		Speed = this.Speed ?? Speed;
		TouchDamage = this.TouchDamage ?? TouchDamage;
		WeaponDamage = this.WeaponDamage ?? WeaponDamage;
		this.set({
			Colors,
			Health,
			TouchDamage,
			Speed,
			HealthModifier,
			WeaponDamage,
		});
	}

	getTypeKey(type = this.Type) {
		switch (type) {
			case ZeldaEnemiesOctorokBlue:
				type = ZeldaEnemiesOctorok;
				break;
			case ZeldaEnemiesBubbleRed:
			case ZeldaEnemiesBubbleBlue:
				type = ZeldaEnemiesBubble;
				break;
			case ZeldaEnemiesDarknutBlue:
				type = ZeldaEnemiesDarknut;
				break;
			case ZeldaEnemiesGelBlue:
				type = ZeldaEnemiesGel;
				break;
			case ZeldaEnemiesGoriyaBlue:
				type = ZeldaEnemiesGoriya;
				break;
			case ZeldaEnemiesKeeseBlue:
			case ZeldaEnemiesKeeseRed:
				type = ZeldaEnemiesKeese;
				break;
			case ZeldaEnemiesLanmolaBlue:
				type = ZeldaEnemiesLanmola;
				break;
			case ZeldaEnemiesLeeverBlue:
				type = ZeldaEnemiesLeever;
				break;
			case ZeldaEnemiesLynelBlue:
				type = ZeldaEnemiesLynel;
				break;
			case ZeldaEnemiesMoblinBlue:
				type = ZeldaEnemiesMoblin;
				break;
			case ZeldaEnemiesMoldormBlue:
				type = ZeldaEnemiesMoldorm;
				break;
			case ZeldaEnemiesRopeBlue:
				type = ZeldaEnemiesRope;
				break;
			case ZeldaEnemiesTektiteBlue:
				type = ZeldaEnemiesTektite;
				break;
			case ZeldaEnemiesWizzrobeBlue:
				type = ZeldaEnemiesWizzrobe;
				break;
			case ZeldaEnemiesZolGray:
			case ZeldaEnemiesZolGreen:
				type = ZeldaEnemiesZol;
				break;
			default:
				break;
		}
		return super.getTypeKey(type);
	}

	// TODOJEF: Generate enemies based on the selection... e.g. if a Blue Octorok is selected,
	// the health and colors are pre-generated and that's what's used when showing the selection, but
	// the user can change the values

	getConfig() {
		const config: IZeldaEnemyConfig = {
			Type: this.getTypeKey(),
			X: this.cell.x,
			Y: this.cell.y,
		};
		const colors = this.getColors(true);
		if (!isEmpty(colors)) {
			config.Colors = colors as string[];
		}
		const { Speed, Health, TouchDamage, HealthModifier, WeaponDamage } = this;
		if (!isEmpty(Speed)) {
			config.Speed = Speed;
		}
		if (!isEmpty(Health)) {
			config.Health = Health;
		}
		if (!isEmpty(TouchDamage)) {
			config.TouchDamage = TouchDamage;
		}
		if (!isEmpty(HealthModifier)) {
			config.HealthModifier = HealthModifier;
		}
		if (!isEmpty(WeaponDamage)) {
			config.WeaponDamage = WeaponDamage;
		}
		return config;
	}
}
