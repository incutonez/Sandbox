import { EnumStore } from "ui/classes/EnumStore.js";
/**
 * @property {Number} Arrow
 * @property {Number} ArrowSilver
 * @property {Number} Bomb
 * @property {Number} Boomerang
 * @property {Number} BoomerangMagical
 * @property {Number} Bow
 * @property {Number} Candle
 * @property {Number} CandleRed
 * @property {Number} Clock
 * @property {Number} Compass
 * @property {Number} Flute
 * @property {Number} Food
 * @property {Number} Heart
 * @property {Number} HeartAlt
 * @property {Number} HeartContainer
 * @property {Number} HeartEmpty
 * @property {Number} HeartHalf
 * @property {Number} Key
 * @property {Number} KeySkeleton
 * @property {Number} Ladder
 * @property {Number} Letter
 * @property {Number} MagicBook
 * @property {Number} Map
 * @property {Number} None
 * @property {Number} PotionBlue
 * @property {Number} PotionRed
 * @property {Number} PowerBracelet
 * @property {Number} Raft
 * @property {Number} RingBlue
 * @property {Number} RingGreen
 * @property {Number} RingRed
 * @property {Number} RupeeFive
 * @property {Number} RupeeOne
 * @property {Number} Shield
 * @property {Number} ShieldMagical
 * @property {Number} Sword
 * @property {Number} SwordMagical
 * @property {Number} SwordWhite
 * @property {Number} TriforceShard
 * @property {Number} TriforceShardAlt
 * @property {Number} Wand
 */
export const Items = new EnumStore({
  records: {
    None: 0,
    Arrow: 1,
    ArrowSilver: 2,
    Bomb: 3,
    Boomerang: 4,
    BoomerangMagical: 5,
    Bow: 6,
    Candle: 7,
    CandleRed: 8,
    Clock: 9,
    Compass: 10,
    Flute: 11,
    Food: 12,
    Heart: 13,
    HeartHalf: 130,
    HeartEmpty: 131,
    HeartAlt: 133,
    HeartContainer: 14,
    Key: 15,
    KeySkeleton: 16,
    Ladder: 17,
    Letter: 18,
    MagicBook: 19,
    Map: 20,
    PotionBlue: 21,
    PotionRed: 22,
    PowerBracelet: 23,
    Raft: 24,
    RingBlue: 25,
    RingGreen: 26,
    RingRed: 27,
    RupeeFive: 28,
    RupeeOne: 29,
    Shield: 30,
    ShieldMagical: 31,
    Sword: 32,
    SwordWhite: 33,
    SwordMagical: 34,
    TriforceShard: 35,
    TriforceShardAlt: 355,
    Wand: 36,
  },
});
