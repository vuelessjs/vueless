/*
  This const is needed to prevent the issue in script setup:
 `defineProps` is referencing locally declared variables. (vue/valid-define-props)
 */
export const UCalendar = "UCalendar";

export const YEARS_PER_VIEW = 12;
export const MONTHS_PER_VIEW = 12;
export const START_WEEK = 1;
export const DAYS_IN_WEEK = 7;
export const SECONDS_IN_MINUTES = 60;
export const MILLISECONDS_IN_MINUTE = 60_000;

export const MAX_HOURS = 23;
export const MIN_HOURS = 0;
export const MAX_MINUTES = 59;
export const MIN_MINUTES = 0;
export const MAX_SECONDS = 59;
export const MIN_SECONDS = 0;
export const SEPARATOR = "—";

export enum LocaleType {
  Day = "day",
  Month = "month",
}

export enum KeyCode {
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowRight = "ArrowRight",
  ArrowDown = "ArrowDown",
  Enter = "Enter",
  Escape = "Escape",
  Space = " Space",
  Backspace = "Backspace",
}

export enum View {
  Day = "day",
  Month = "month",
  Year = "year",
}

export enum InputType {
  Hours,
  Minutes,
  Seconds,
}

export const ARROW_KEYS: string[] = [
  KeyCode.ArrowLeft,
  KeyCode.ArrowUp,
  KeyCode.ArrowRight,
  KeyCode.ArrowDown,
];

export const TOKEN_REG_EXP = {
  D: "(\\w+)",
  F: "(\\w+)",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "",
  M: "(\\w+)",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "(\\w+)",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})",
};
