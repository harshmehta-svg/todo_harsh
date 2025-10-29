/**
 * @fileoverview Logger utility that only logs messages in development mode.
 * This utility provides a centralized way to handle logging, ensuring that
 * console output is stripped from production builds.
 */

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * A no-operation function for production environments.
 */
const noOp = () => {};

/**
 * Logs messages to the console. In development mode, it uses `console.log`.
 * In production, it does nothing.
 *
 * @param {...any} args - The values to log.
 */
const log = isDevelopment ? console.log.bind(console) : noOp;

/**
 * Logs error messages to the console. In development mode, it uses `console.error`.
 * In production, it does nothing.
 *
 * @param {...any} args - The error values to log.
 */
const error = isDevelopment ? console.error.bind(console) : noOp;

/**
 * Logs warning messages to the console. In development mode, it uses `console.warn`.
 * In production, it does nothing.
 *
 * @param {...any} args - The warning values to log.
 */
const warn = isDevelopment ? console.warn.bind(console) : noOp;

/**
 * Logs informational messages to the console. In development mode, it uses `console.info`.
 * In production, it does nothing.
 *
 * @param {...any} args - The informational values to log.
 */
const info = isDevelopment ? console.info.bind(console) : noOp;

const logger = {
  log,
  error,
  warn,
  info,
};

export default logger;