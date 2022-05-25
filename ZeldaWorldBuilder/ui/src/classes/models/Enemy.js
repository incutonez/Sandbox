import { WorldObject } from "ui/classes/models/WorldObject.js";
import { Enemies } from "ui/classes/enums/NPCs.js";
import { ImageType } from "ui/Image.js";
import { isEmpty } from "@incutonez/shared";
import { WorldColors } from "ui/classes/enums/WorldColors.js";

let WhiteBlack = [WorldColors.WhitePure, WorldColors.Black];
const WhiteBlackRed = [WorldColors.WhitePure, WorldColors.Black, WorldColors.RedPure];
const RedOrange = WhiteBlackRed.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.RedPure) {
    config.Value = WorldColors.Orange;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.Red;
  }
  return config;
});
const OrangeRed = WhiteBlackRed.map((color) => {
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
const BlueBlueLight = WhiteBlackRed.map((color) => {
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
const BlueLightBlue = WhiteBlackRed.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.RedPure) {
    config.Value = WorldColors.BlueLight;
  }
  else if (color === WorldColors.Black) {
    config.Value = WorldColors.Blue;
  }
  return config;
});
const MoblinRed = WhiteBlackRed.map((color) => {
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
    config.Value = WorldColors.WhitePure;
  }
  return config;
});
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
const MoblinBlue = WhiteBlackRed.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.RedPure) {
    config.Value = WorldColors.Red;
  }
  else if (color === WorldColors.WhitePure) {
    config.Value = WorldColors.Teal;
  }
  return config;
});
const Zora = WhiteBlackRed.map((color) => {
  const config = {
    Target: color,
  };
  if (color === WorldColors.RedPure) {
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
    }]);
  }

  get imageType() {
    return ImageType.Enemies;
  }

  get enumCollection() {
    return Enemies;
  }

  // TODO: Should standardize the colors even further, so we don't have the dupe case statements
  getDefaultColors(type) {
    let colors = WhiteBlackRed;
    // TODO: Need to get colors for regular Bubble
    switch (type) {
      case Enemies.PolsVoice:
        colors = PolsVoice;
        break;
      case Enemies.ZolGreen:
        colors = ZolGreen;
        break;
      case Enemies.ZolGray:
        colors = ZolGray;
        break;
      case Enemies.Moblin:
        colors = MoblinRed;
        break;
      case Enemies.MoblinBlue:
        colors = MoblinBlue;
        break;
      case Enemies.Zora:
        colors = Zora;
        break;
      case Enemies.Armos:
      case Enemies.Rock:
      case Enemies.Darknut:
      case Enemies.Goriya:
      case Enemies.LikeLike:
      case Enemies.PatraHead:
      case Enemies.Peahat:
      case Enemies.Rope:
      case Enemies.Stalfos:
      case Enemies.Tektite:
      case Enemies.Wizzrobe:
        colors = OrangeRed;
        break;
      case Enemies.Octorok:
      case Enemies.BubbleRed:
      case Enemies.Lanmola:
      case Enemies.Leever:
      case Enemies.Lynel:
      case Enemies.Moldorm:
        colors = RedOrange;
        break;
      case Enemies.DarknutBlue:
      case Enemies.Gibdo:
      case Enemies.GoriyaBlue:
      case Enemies.Patra:
      case Enemies.RopeBlue:
      case Enemies.TektiteBlue:
      case Enemies.Vire:
      case Enemies.Wallmaster:
      case Enemies.WizzrobeBlue:
        colors = BlueBlueLight;
        break;
      case Enemies.BubbleBlue:
      case Enemies.Ghini:
      case Enemies.OctorokBlue:
      case Enemies.LanmolaBlue:
      case Enemies.LeeverBlue:
      case Enemies.LynelBlue:
      case Enemies.Trap:
        colors = BlueLightBlue;
        break;
      case Enemies.GelBlue:
        colors = GelBlue;
        break;
      case Enemies.KeeseBlue:
        colors = KeeseBlue;
        break;
      case Enemies.KeeseRed:
        colors = KeeseRed;
        break;
      case Enemies.Gel:
      case Enemies.Keese:
      case Enemies.Zol:
        colors = WhiteBlack;
        break;
      default:
        break;
    }
    return colors;
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

  // TODOJEF: Can certain enemies based on the selection... e.g. if a Blue Octorok is selected,
  // the health and colors are pre-generated and that's what's used when showing the selection, but
  // the user can change the values

  // TODOJEF: Need to not output things like OctorokBlue... it should just be Octorok... moving to
  // a more generic system, but the health and strength is determined by the configuration
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
    const { Speed } = this;
    if (!isEmpty(Speed)) {
      config.Speed = Speed;
    }
    return config;
  }
}
