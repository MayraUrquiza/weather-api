import { TransformableInfo } from "logform";
import { createLogger, transports, format } from "winston";

const { combine, timestamp, printf, colorize } = format;

const colors = {
  info: "cyan",
  warn: "yellow",
  error: "red",
  verbose: "magenta",
};

const timestampFormat = "YYYY-MM-DD HH:mm:ss.SSS";

const printFormatFn = ({ level, message, timestamp }: TransformableInfo) =>
  `${timestamp} ${level.toLocaleUpperCase()}  ${message}`;

const consoleFormat = combine(
  colorize({ message: true, colors }),
  timestamp({ format: timestampFormat }),
  printf(printFormatFn)
);

const fileFormat = combine(
  timestamp({ format: timestampFormat }),
  printf(printFormatFn)
);

export const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: consoleFormat,
    }),
    new transports.File({
      filename: "verbose.log",
      level: "verbose",
      format: fileFormat,
    }),
    new transports.File({
      filename: "errors.log",
      level: "error",
      format: fileFormat,
    }),
  ],
});
