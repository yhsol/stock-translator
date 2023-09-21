import { createLogger, format, transports, Logger } from "winston";
const { combine, timestamp, printf } = format;
import util from "util";

const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
  const metaString = Object.keys(metadata).length
    ? util.inspect(metadata, { depth: null, colors: true })
    : "";
  return `[${timestamp}] [${level}] ${message} ${metaString}`;
});

const logger: Logger = createLogger({
  level: "info",
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "server.log" }),
  ],
});

export default logger;
