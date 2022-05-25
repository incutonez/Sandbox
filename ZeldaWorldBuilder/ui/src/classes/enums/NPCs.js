import { EnumStore } from "ui/classes/EnumStore.js";
/**
 * @property {Number} Fairy
 * @property {Number} Link
 * @property {Number} Merchant
 * @property {Number} OldMan
 * @property {Number} OldMan2
 * @property {Number} OldWoman
 * @property {Number} Zelda
 */
export const Characters = new EnumStore({
  records: {
    Fairy: 1,
    Link: 2,
    Merchant: 3,
    OldMan: 4,
    OldMan2: 5,
    OldWoman: 6,
    Zelda: 7,
  },
});
/**
 * @property {Number} Armos
 * @property {Number} Bubble
 * @property {Number} BubbleBlue
 * @property {Number} BubbleRed
 * @property {Number} Darknut
 * @property {Number} DarknutBlue
 * @property {Number} Gel
 * @property {Number} GelBlue
 * @property {Number} Ghini
 * @property {Number} Gibdo
 * @property {Number} GleeokHead
 * @property {Number} Goriya
 * @property {Number} GoriyaBlue
 * @property {Number} Keese
 * @property {Number} KeeseBlue
 * @property {Number} KeeseRed
 * @property {Number} Lanmola
 * @property {Number} LanmolaBlue
 * @property {Number} Leever
 * @property {Number} LeeverBlue
 * @property {Number} LikeLike
 * @property {Number} Lynel
 * @property {Number} LynelBlue
 * @property {Number} Moblin
 * @property {Number} MoblinBlue
 * @property {Number} Moldorm
 * @property {Number} Octorok
 * @property {Number} OctorokBlue
 * @property {Number} Patra
 * @property {Number} PatraHead
 * @property {Number} Peahat
 * @property {Number} PolsVoice
 * @property {Number} Rock
 * @property {Number} Rope
 * @property {Number} RopeBlue
 * @property {Number} Stalfos
 * @property {Number} Tektite
 * @property {Number} TektiteBlue
 * @property {Number} Trap
 * @property {Number} Vire
 * @property {Number} Wallmaster
 * @property {Number} Wizzrobe
 * @property {Number} WizzrobeBlue
 * @property {Number} Zol
 * @property {Number} ZolGray
 * @property {Number} ZolGreen
 * @property {Number} Zora
 */
export const Enemies = new EnumStore({
  records: {
    Armos: 0,
    Rock: 1,
    Bubble: 2,
    BubbleBlue: 3,
    BubbleRed: 4,
    Darknut: 5,
    DarknutBlue: 6,
    Gel: 7,
    GelBlue: 77,
    Ghini: 8,
    Gibdo: 9,
    GleeokHead: 10,
    Goriya: 11,
    GoriyaBlue: 12,
    Keese: 13,
    KeeseBlue: 14,
    KeeseRed: 15,
    Lanmola: 16,
    LanmolaBlue: 17,
    Leever: 18,
    LeeverBlue: 19,
    LikeLike: 20,
    Lynel: 21,
    LynelBlue: 22,
    Moblin: 23,
    MoblinBlue: 24,
    Moldorm: 25,
    Octorok: 26,
    OctorokBlue: 27,
    Patra: 28,
    PatraHead: 200,
    Peahat: 29,
    PolsVoice: 30,
    Rope: 31,
    RopeBlue: 32,
    Stalfos: 33,
    Tektite: 34,
    TektiteBlue: 35,
    Trap: 36,
    Vire: 37,
    Wallmaster: 38,
    Wizzrobe: 39,
    WizzrobeBlue: 40,
    Zol: 41,
    ZolGray: 410,
    ZolGreen: 411,
    Zora: 42,
  },
});
/**
 * @property {Number} Aquamentus
 * @property {Number} Digdogger
 * @property {Number} Dodongo
 * @property {Number} Ganon
 * @property {Number} Gleeok
 * @property {Number} Gohma
 * @property {Number} GohmaBlue
 * @property {Number} Manhandla
 */
export const Bosses = new EnumStore(["Aquamentus",
  "Digdogger",
  "Dodongo",
  "Ganon",
  "Gleeok",
  "Gohma",
  "GohmaBlue",
  "Manhandla"]);
