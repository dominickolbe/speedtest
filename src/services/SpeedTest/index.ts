import speedtestNet, { Options, SpeedTestEvent } from "speedtest-net";

const options: Options = {
  acceptLicense: true,
  acceptGdpr: true,
};

export const SpeedTest = {
  start: async (progressFn: (e: SpeedTestEvent) => void) =>
    speedtestNet({
      ...options,
      progress: (e) => e && progressFn(e),
    }),
};
