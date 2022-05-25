import { EnumStore } from "ui/classes/EnumStore.js";
/**
 * @property {Number} Base
 * @property {Number} Black
 * @property {Number} Blocks1
 * @property {Number} Blocks2
 * @property {Number} Blocks2Vertical
 * @property {Number} Blocks2X3Column
 * @property {Number} Blocks2X3Columns
 * @property {Number} Blocks3Horizontal
 * @property {Number} Blocks3Rows
 * @property {Number} Blocks4
 * @property {Number} Blocks4Alt
 * @property {Number} Blocks4Statues
 * @property {Number} Blocks4Way
 * @property {Number} Blocks6Alt
 * @property {Number} Blocks6Vertical
 * @property {Number} BlocksAquamentus
 * @property {Number} BlocksArrow
 * @property {Number} BlocksC
 * @property {Number} BlocksDiagonal
 * @property {Number} BlocksGleeok
 * @property {Number} BlocksHorizontal
 * @property {Number} BlocksMaze
 * @property {Number} BlocksRectangle
 * @property {Number} BlocksSpiral
 * @property {Number} BlocksStairsCenter
 * @property {Number} BlocksStairsEnd
 * @property {Number} BlocksX
 * @property {Number} Ending
 * @property {Number} Entrance
 * @property {Number} Exit
 * @property {Number} Ganon
 * @property {Number} KeepItem
 * @property {Number} KeepPath
 * @property {Number} Plain
 * @property {Number} PlainStatues
 * @property {Number} PlainStatues2
 * @property {Number} Sand
 * @property {Number} Shop
 * @property {Number} WaterBrackets
 * @property {Number} WaterH
 * @property {Number} WaterHAlt
 * @property {Number} WaterHorizontal
 * @property {Number} WaterHorizontal2
 * @property {Number} WaterLadder
 * @property {Number} WaterMaze
 * @property {Number} WaterRectangle
 * @property {Number} WaterT
 * @property {Number} WaterVertical
 */
export const ScreenTemplates = new EnumStore({
  records: {
    Base: -1,
    Plain: 0,
    Entrance: 1,
    Blocks2X3Columns: 2,
    Blocks2X3Column: 3,
    Blocks4: 4,
    Blocks4Alt: 5,
    Blocks1: 6,
    BlocksX: 7,
    Blocks3Rows: 8,
    WaterMaze: 9,
    BlocksAquamentus: 10,
    Exit: 11,
    BlocksStairsCenter: 12,
    WaterBrackets: 13,
    PlainStatues: 14,
    Sand: 15,
    BlocksStairsEnd: 16,
    BlocksDiagonal: 17,
    BlocksHorizontal: 18,
    BlocksC: 19,
    Blocks2: 20,
    BlocksMaze: 21,
    WaterHorizontal: 22,
    WaterT: 23,
    Blocks4Statues: 24,
    BlocksGleeok: 25,
    WaterLadder: 26,
    Blocks6Alt: 27,
    WaterVertical: 28,
    Blocks3Horizontal: 29,
    WaterRectangle: 30,
    PlainStatues2: 31,
    BlocksRectangle: 32,
    WaterHorizontal2: 33,
    BlocksSpiral: 34,
    Ganon: 35,
    Ending: 36,
    Blocks2Vertical: 37,
    Blocks6Vertical: 38,
    Blocks4Way: 39,
    WaterH: 40,
    Black: 41,
    BlocksArrow: 42,
    WaterHAlt: 43,
    KeepItem: 44,
    KeepPath: 45,
    Shop: 46,
  },
});
