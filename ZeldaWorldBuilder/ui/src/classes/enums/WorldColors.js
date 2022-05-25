import { EnumStore } from "ui/classes/EnumStore.js";
import { Color } from "ui/classes/models/Color.js";
/**
 * @property {String} Black
 * @property {String} Blue
 * @property {String} BlueLight
 * @property {String} BluePure
 * @property {String} BlueWater
 * @property {String} Brown
 * @property {String} BrownButter
 * @property {String} BrownDark
 * @property {String} BrownLight
 * @property {String} Gray
 * @property {String} Green
 * @property {String} GreenDark
 * @property {String} GreenLight
 * @property {String} GreenPure
 * @property {String} Lime
 * @property {String} None
 * @property {String} Orange
 * @property {String} OrangeDark
 * @property {String} Peach
 * @property {String} PurpleLight
 * @property {String} Q1C1Accent
 * @property {String} Q1C1Door
 * @property {String} Red
 * @property {String} RedPure
 * @property {String} Tan
 * @property {String} Teal
 * @property {String} TealDark
 * @property {String} TealLight
 * @property {String} White
 * @property {String} WhitePure
 */
export const WorldColors = new EnumStore({
  model: Color,
  records: {
    None: "Transparent",
    Black: "000000",
    Blue: "0000bc",
    BlueLight: "6888ff",
    BluePure: "0000FF",
    BlueWater: "2038ec",
    Brown: "c84c0c",
    BrownButter: "ac7c00",
    BrownDark: "503000",
    BrownLight: "f8b800",
    Gray: "7c7c7c",
    Green: "00a800",
    GreenDark: "005800",
    GreenLight: "58f898",
    GreenPure: "00FF00",
    Lime: "b8f818",
    Orange: "FFA044",
    OrangeDark: "e45c10",
    Peach: "fcd8a8",
    PurpleLight: "b8b8f8",
    Q1C1Accent: "008088",
    Q1C1Door: "183c5c",
    Red: "F83800",
    RedPure: "FF0000",
    Tan: "FFEFA6",
    Teal: "008888",
    TealLight: "00e8d8",
    TealDark: "004058",
    White: "fcfcfc",
    WhitePure: "FFFFFF",
  },
});
