import { EnumStore } from "ui/classes/EnumStore.js";
/**
 * @property {Number} ActionDown
 * @property {Number} ActionLeft
 * @property {Number} ActionRight
 * @property {Number} ActionUp
 * @property {Number} Entering
 * @property {Number} Exiting
 * @property {Number} IdleDown
 * @property {Number} IdleLeft
 * @property {Number} IdleRight
 * @property {Number} IdleUp
 * @property {Number} WalkDown
 * @property {Number} WalkLeft
 * @property {Number} WalkRight
 * @property {Number} WalkUp
 */
export const Animations = new EnumStore(["ActionUp",
  "ActionDown",
  "ActionRight",
  "ActionLeft",
  "Entering",
  "Exiting",
  "IdleUp",
  "IdleDown",
  "IdleRight",
  "IdleLeft",
  "WalkUp",
  "WalkDown",
  "WalkRight",
  "WalkLeft"]);
