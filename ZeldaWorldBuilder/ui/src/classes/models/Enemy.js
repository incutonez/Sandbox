import { WorldObject } from "ui/classes/models/WorldObject.js";
import { Enemies } from "ui/classes/enums/NPCs.js";
import { ImageType } from "ui/Image.js";
import { isEmpty } from "@incutonez/shared";
import { WorldColors } from "ui/classes/enums/WorldColors.js";

let WhiteBlack = [WorldColors.WhitePure, WorldColors.Black];
const WhiteBlackRed = [WorldColors.WhitePure, WorldColors.Black, WorldColors.RedPure];
/**
 * For the most part, the coloring is by having 2 different color palettes...
 * a red/orange for the standard version, and blue/light blue for the harder version of the enemy.
 */
const EnemyNormal = WhiteBlackRed.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.RedPure) {
    config.Value = WorldColors.Red;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.Orange;
  }
  return config;
});
const EnemyHard = WhiteBlackRed.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.RedPure) {
    config.Value = WorldColors.Blue;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.BlueLight;
  }
  return config;
});
/* PolsVoice is a little more unique, as its RedPure color actually changes based on the suit that
 * Link is wearing... e.g.
 * Green Ring = Lime (default)
 * Blue Ring = PurpleLight
 * Red Ring = Red */
const PolsVoice = WhiteBlackRed.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.Black) {
    config.Value = WorldColors.Red;
  }
  else if (color === WorldColors.WhitePure) {
    config.Value = WorldColors.Orange;
  }
  else if (color === WorldColors.RedPure) {
    config.Value = WorldColors.Lime;
  }
  return config;
});
// The harder version of the moblin has all 3 different colors instead of the standard 2 changes
const MoblinHarder = WhiteBlackRed.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.RedPure) {
    config.Value = WorldColors.Black;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.Teal;
  }
  else if (color === WorldColors.WhitePure) {
    config.Value = WorldColors.Red;
  }
  return config;
});
const Zora = WhiteBlack.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.WhitePure) {
    config.Value = WorldColors.Red;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.Teal;
  }
  return config;
});
const GelBlue = WhiteBlack.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.WhitePure) {
    config.Value = WorldColors.TealLight;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.TealDark;
  }
  return config;
});
const KeeseBlue = WhiteBlack.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.WhitePure) {
    config.Value = WorldColors.BlueLight;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.Blue;
  }
  return config;
});
const KeeseRed = WhiteBlack.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.WhitePure) {
    config.Value = WorldColors.Orange;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.Red;
  }
  return config;
});
const ZolGray = WhiteBlack.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.Black) {
    config.Value = WorldColors.Gray;
  }
  return config;
});
const ZolGreen = WhiteBlack.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.WhitePure) {
    config.Value = WorldColors.GreenLight;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.GreenDark;
  }
  return config;
});
WhiteBlack = WhiteBlack.map((color) => {
  return {
    Target: color,
  };
});
/**
 * @property {String} image
 * @property {String} src
 * @property {Cell} cell
 * @property {Number} type
 * @property {Number} Speed
 */
export class Enemy extends WorldObject {
  /* TODO: Potentially implement colors that can change for the bosses, but that would involve
   * genericizing the bosses dir asset to have colors that are common */
  getDefaultFields() {
    return super.getDefaultFields().concat([{
      name: "Speed",
      type: Number,
      defaultValue: null,
    }, {
      name: "Health",
      type: Number,
      defaultValue: null,
    }, {
      name: "TouchDamage",
      type: Number,
      defaultValue: null,
    }, {
      name: "HealthModifier",
      type: Number,
      defaultValue: null,
    }, {
      name: "WeaponDamage",
      type: Number,
      defaultValue: null,
    }]);
  }

  get imageType() {
    return ImageType.Enemies;
  }

  get enumCollection() {
    return Enemies;
  }

  setDefaultValues() {
    let Health;
    let Speed;
    let TouchDamage;
    let HealthModifier;
    let WeaponDamage;
    let Colors = WhiteBlackRed;
    switch (this.Type) {
      case Enemies.Armos:
        Colors = EnemyNormal;
        Health = 6;
        TouchDamage = 1;
        Speed = 3;
        break;
      case Enemies.Bubble:
        // TODO: Need to get proper colors for regular Bubble
        Colors = EnemyNormal;
        Health = 0;
        TouchDamage = 0;
        Speed = 3;
        break;
      case Enemies.BubbleRed:
        Colors = EnemyNormal;
        Health = 0;
        TouchDamage = 0;
        Speed = 3;
        break;
      case Enemies.BubbleBlue:
        Colors = EnemyHard;
        Health = 0;
        TouchDamage = 0;
        Speed = 3;
        break;
      case Enemies.Darknut:
        Colors = EnemyNormal;
        Health = 8;
        TouchDamage = 2;
        Speed = 3;
        break;
      case Enemies.DarknutBlue:
        Colors = EnemyHard;
        Health = 16;
        TouchDamage = 4;
        Speed = 5;
        break;
      case Enemies.Gel:
        Colors = WhiteBlack;
        Health = 2;
        TouchDamage = 1;
        Speed = 1;
        break;
      case Enemies.GelBlue:
        Colors = GelBlue;
        Health = 2;
        TouchDamage = 1;
        Speed = 1;
        break;
      case Enemies.Ghini:
        Colors = EnemyHard;
        Health = 22;
        TouchDamage = 1;
        Speed = 2;
        break;
      case Enemies.Gibdo:
        Colors = EnemyHard;
        Health = 12;
        TouchDamage = 4;
        Speed = 3;
        HealthModifier = 0.75;
        break;
      case Enemies.Goriya:
        Colors = EnemyNormal;
        Health = 6;
        TouchDamage = 1;
        Speed = 3;
        WeaponDamage = 2;
        break;
      case Enemies.GoriyaBlue:
        Colors = EnemyHard;
        Health = 10;
        TouchDamage = 2;
        Speed = 3;
        WeaponDamage = 2;
        break;
      case Enemies.Keese:
        Colors = WhiteBlack;
        Health = 2;
        TouchDamage = 1;
        Speed = 4;
        break;
      case Enemies.KeeseBlue:
        Colors = KeeseBlue;
        Health = 2;
        TouchDamage = 1;
        Speed = 4;
        break;
      case Enemies.KeeseRed:
        Colors = KeeseRed;
        Health = 2;
        TouchDamage = 1;
        Speed = 4;
        break;
      case Enemies.Lanmola:
        Colors = EnemyNormal;
        Health = 8;
        HealthModifier = 0;
        TouchDamage = 4;
        Speed = 4;
        break;
      case Enemies.LanmolaBlue:
        Colors = EnemyHard;
        Health = 8;
        HealthModifier = 0;
        TouchDamage = 4;
        Speed = 6;
        break;
      case Enemies.Leever:
        Colors = EnemyNormal;
        Health = 4;
        TouchDamage = 1;
        Speed = 4;
        break;
      case Enemies.LeeverBlue:
        Colors = EnemyHard;
        Health = 8;
        TouchDamage = 2;
        Speed = 4;
        break;
      case Enemies.LikeLike:
        Colors = EnemyNormal;
        Health = 20;
        TouchDamage = 2;
        Speed = 3;
        break;
      case Enemies.Lynel:
        Colors = EnemyNormal;
        Health = 8;
        TouchDamage = 2;
        Speed = 3;
        WeaponDamage = 2;
        break;
      case Enemies.LynelBlue:
        Colors = EnemyHard;
        Health = 12;
        TouchDamage = 4;
        Speed = 3;
        WeaponDamage = 4;
        break;
      case Enemies.Moblin:
        Colors = EnemyNormal;
        Health = 4;
        TouchDamage = 1;
        Speed = 3;
        WeaponDamage = 1;
        break;
      case Enemies.MoblinBlue:
        Colors = MoblinHarder;
        Health = 6;
        TouchDamage = 1;
        Speed = 3;
        WeaponDamage = 1;
        break;
      case Enemies.Moldorm:
        Colors = EnemyNormal;
        Health = 10;
        HealthModifier = 0;
        TouchDamage = 1;
        Speed = 1;
        break;
      // TODO: Is there a blue Moldorm?
      case Enemies.MoldormBlue:
        Colors = EnemyHard;
        break;
      case Enemies.Octorok:
        Colors = EnemyNormal;
        Health = 2;
        TouchDamage = 1;
        WeaponDamage = 1;
        Speed = 3;
        break;
      case Enemies.OctorokBlue:
        Colors = EnemyHard;
        Health = 4;
        TouchDamage = 1;
        WeaponDamage = 1;
        Speed = 3;
        break;
      case Enemies.Patra:
        Colors = EnemyHard;
        Health = 20;
        TouchDamage = 4;
        Speed = 3;
        break;
      case Enemies.PatraHead:
        Colors = EnemyNormal;
        Health = 20;
        TouchDamage = 4;
        Speed = 3;
        break;
      case Enemies.Peahat:
        Colors = EnemyNormal;
        Health = 4;
        TouchDamage = 1;
        Speed = 3;
        break;
      case Enemies.PolsVoice:
        Colors = PolsVoice;
        Health = 20;
        TouchDamage = 4;
        Speed = 3;
        break;
      case Enemies.Rock:
        Colors = EnemyNormal;
        Health = 0;
        TouchDamage = 1;
        Speed = 3;
        break;
      case Enemies.Rope:
        Colors = EnemyNormal;
        Health = 2;
        TouchDamage = 1;
        Speed = 3;
        break;
      case Enemies.RopeBlue:
        Colors = EnemyHard;
        Health = 8;
        TouchDamage = 1;
        Speed = 3;
        break;
      case Enemies.Stalfos:
        Colors = EnemyNormal;
        Health = 4;
        TouchDamage = 0.25;
        WeaponDamage = 0.25;
        Speed = 3;
        break;
      case Enemies.Tektite:
        Colors = EnemyNormal;
        Health = 2;
        TouchDamage = 1;
        Speed = 3;
        break;
      case Enemies.TektiteBlue:
        Colors = EnemyHard;
        Health = 2;
        TouchDamage = 1;
        Speed = 3;
        break;
      case Enemies.Trap:
        Colors = EnemyHard;
        Health = 0;
        TouchDamage = 1;
        Speed = 3;
        break;
      case Enemies.Vire:
        Colors = EnemyHard;
        Health = 2;
        TouchDamage = 2;
        Speed = 3;
        break;
      case Enemies.Wallmaster:
        Colors = EnemyHard;
        Health = 6;
        TouchDamage = 1;
        Speed = 1;
        break;
      case Enemies.Wizzrobe:
        Colors = EnemyNormal;
        Health = 6;
        TouchDamage = 2;
        WeaponDamage = 8;
        Speed = 0;
        break;
      case Enemies.WizzrobeBlue:
        Colors = EnemyHard;
        Health = 10;
        TouchDamage = 4;
        WeaponDamage = 4;
        Speed = 5;
        break;
      case Enemies.Zol:
        Colors = WhiteBlack;
        Health = 2;
        TouchDamage = 2;
        Speed = 1;
        break;
      case Enemies.ZolGray:
        Colors = ZolGray;
        Health = 2;
        TouchDamage = 2;
        Speed = 1;
        break;
      case Enemies.ZolGreen:
        Colors = ZolGreen;
        Health = 2;
        TouchDamage = 2;
        Speed = 1;
        break;
      case Enemies.Zora:
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

  getTypeKey() {
    let value;
    const enums = this.enumCollection;
    switch (this.Type) {
      case enums.OctorokBlue:
        value = enums.Octorok;
        break;
      case enums.BubbleRed:
      case enums.BubbleBlue:
        value = enums.Bubble;
        break;
      case enums.DarknutBlue:
        value = enums.Darknut;
        break;
      case enums.GelBlue:
        value = enums.Gel;
        break;
      case Enemies.GoriyaBlue:
        value = enums.Goriya;
        break;
      case Enemies.KeeseBlue:
      case Enemies.KeeseRed:
        value = enums.Keese;
        break;
      case Enemies.LanmolaBlue:
        value = enums.Lanmola;
        break;
      case Enemies.LeeverBlue:
        value = enums.Leever;
        break;
      case Enemies.LynelBlue:
        value = enums.Lynel;
        break;
      case Enemies.MoblinBlue:
        value = enums.Moblin;
        break;
      case Enemies.MoldormBlue:
        value = enums.Moldorm;
        break;
      case Enemies.RopeBlue:
        value = enums.Rope;
        break;
      case Enemies.TektiteBlue:
        value = enums.Tektite;
        break;
      case Enemies.WizzrobeBlue:
        value = enums.Wizzrobe;
        break;
      case enums.ZolGray:
      case enums.ZolGreen:
        value = enums.Zol;
        break;
      default:
        return super.getTypeKey();
    }
    return enums.getKey(value);
  }

  // TODOJEF: Generate enemies based on the selection... e.g. if a Blue Octorok is selected,
  // the health and colors are pre-generated and that's what's used when showing the selection, but
  // the user can change the values

  getConfig() {
    const config = {
      Type: this.getTypeKey(),
      X: this.cell.x,
      Y: this.cell.y,
    };
    const colors = this.getColors(true);
    if (!isEmpty(colors)) {
      config.Colors = colors;
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
