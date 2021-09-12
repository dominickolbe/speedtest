import chalk from "chalk";
import ora from "ora";
import { APP_NAME } from "./config";

export const log = console.log;
export const clear = console.clear;

export const DIVIDER_WIDTH = 8;

export const banner = () => chalk`
    ✨ {bold ${APP_NAME}} ✨`;

export const spinner = ora({
  spinner: "bouncingBar",
});

export const formatBandwidth = (value: number) => {
  let bits = value * 8;
  const units = ["", "K", "M", "G", "T"];
  const places = [0, 1, 2, 3, 3];
  let unit = 0;
  while (bits >= 2000 && unit < 4) {
    unit++;
    bits /= 1000;
  }
  return chalk`{bold ${bits.toFixed(places[unit])}} {dim ${units[unit]}bps}`;
};
