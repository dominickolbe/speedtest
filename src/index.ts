#!/usr/bin/env node

const resolve = require("path").resolve;
require("dotenv").config({ path: resolve(__dirname, "../.env") });

import chalk from "chalk";
import { SpeedTestEvent } from "speedtest-net";
import { SpeedTest } from "./services/SpeedTest";
import { SpeedTestResult } from "./types";
import {
  banner,
  clear,
  DIVIDER_WIDTH,
  formatBandwidth,
  log,
  spinner,
} from "./utils";

const stats: SpeedTestResult = {
  ping: { jitter: null, latency: null, progress: 0 },
  download: { bandwidth: null, bytes: null, progress: 0 },
  upload: { bandwidth: null, bytes: null, progress: 0 },
};

const getDisplayData = () => chalk`
  {dim.gray ${"─".repeat(DIVIDER_WIDTH * 3)}}

  {dim     Ping:}  {bold ${
    stats.ping.latency ? stats.ping.latency.toFixed(1) : ""
  }}{dim ${stats.ping.latency ? " ms" : "..."}}
  {dim Download:}  {bold ${
    stats.download.bandwidth ? formatBandwidth(stats.download.bandwidth) : ""
  }}{dim ${stats.download.bandwidth ? "" : "..."}}
  {dim   Upload:}  {bold ${
    stats.upload.bandwidth ? formatBandwidth(stats.upload.bandwidth) : ""
  }}{dim ${stats.upload.bandwidth ? "" : "..."}}

  {dim.gray ${"─".repeat(DIVIDER_WIDTH * 3)}}

         `;

const parseEventData = (event: SpeedTestEvent) => {
  switch (event.type) {
    case "ping":
      stats.ping = {
        jitter: event.ping.jitter,
        latency: event.ping.latency,
        progress: event.ping.progress ?? 0,
      };
      spinner.prefixText = getDisplayData();
      break;
    case "download":
      stats.download = {
        bandwidth: event.download.bandwidth,
        bytes: event.download.bytes,
        progress: event.download.progress ?? 0,
      };
      spinner.prefixText = getDisplayData();
      break;
    case "upload":
      stats.upload = {
        bandwidth: event.upload.bandwidth,
        bytes: event.upload.bytes,
        progress: event.upload.progress ?? 0,
      };
      spinner.prefixText = getDisplayData();
      break;
    case "log":
      spinner.prefixText = getDisplayData();
      break;
  }
};

const app = async () => {
  clear();

  log(banner());

  spinner.prefixText = getDisplayData();
  spinner.start();

  await SpeedTest.start(parseEventData);

  spinner.stopAndPersist({
    symbol: "",
  });
};

app();
