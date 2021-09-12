import { Boolean, Null, Number, Record, Static, String } from "runtypes";

export const RtSpeedTestResult = Record({
  ping: Record({
    jitter: Number.Or(Null),
    latency: Number.Or(Null),
    progress: Number,
  }),
  download: Record({
    bandwidth: Number.Or(Null),
    bytes: Number.Or(Null),
    progress: Number,
  }),
  upload: Record({
    bandwidth: Number.Or(Null),
    bytes: Number.Or(Null),
    progress: Number,
  }),
});

export type SpeedTestResult = Static<typeof RtSpeedTestResult>;
