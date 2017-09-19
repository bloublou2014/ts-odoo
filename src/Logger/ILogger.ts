/**
 * Using abstract class instead of interface due to lack of runtime metadata information of typescript interface
 */

/* tslint:disable */
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export abstract class ILogger {

    /**
     * Special case to log an `Error` instance to the record.
     * This adds an `err` field with exception details
     * (including the stack) and sets `msg` to the exception
     * message or you can specify the `msg`.
     */
    trace(error: Error, ...params: any[]): void;

    /**
     * The first field can optionally be a "fields" object, which
     * is merged into the log record.
     *
     * To pass in an Error *and* other fields, use the `err`
     * field name for the Error instance.
     */
    trace(obj: Object, ...params: any[]): void;

    /**
     * Uses `util.format` for msg formatting.
     */
    trace(format: any, ...params: any[]): void {
    };

    /**
     * Special case to log an `Error` instance to the record.
     * This adds an `err` field with exception details
     * (including the stack) and sets `msg` to the exception
     * message or you can specify the `msg`.
     */
    debug(error: Error, ...params: any[]): void;

    /**
     * The first field can optionally be a "fields" object, which
     * is merged into the log record.
     *
     * To pass in an Error *and* other fields, use the `err`
     * field name for the Error instance.
     */
    debug(obj: Object, ...params: any[]): void;

    /**
     * Uses `util.format` for msg formatting.
     */
    debug(format: any, ...params: any[]): void {
    };

    /**
     * Special case to log an `Error` instance to the record.
     * This adds an `err` field with exception details
     * (including the stack) and sets `msg` to the exception
     * message or you can specify the `msg`.
     */
    info(error: Error, ...params: any[]): void;

    /**
     * The first field can optionally be a "fields" object, which
     * is merged into the log record.
     *
     * To pass in an Error *and* other fields, use the `err`
     * field name for the Error instance.
     */
    info(obj: Object, ...params: any[]): void;

    /**
     * Uses `util.format` for msg formatting.
     */
    info(format: any, ...params: any[]): void {
    };

    /**
     * Special case to log an `Error` instance to the record.
     * This adds an `err` field with exception details
     * (including the stack) and sets `msg` to the exception
     * message or you can specify the `msg`.
     */
    warn(error: Error, ...params: any[]): void;

    /**
     * The first field can optionally be a "fields" object, which
     * is merged into the log record.
     *
     * To pass in an Error *and* other fields, use the `err`
     * field name for the Error instance.
     */
    warn(obj: Object, ...params: any[]): void;

    /**
     * Uses `util.format` for msg formatting.
     */
    warn(format: any, ...params: any[]): void {
    };

    /**
     * Special case to log an `Error` instance to the record.
     * This adds an `err` field with exception details
     * (including the stack) and sets `msg` to the exception
     * message or you can specify the `msg`.
     */
    error(error: Error, ...params: any[]): void;

    /**
     * The first field can optionally be a "fields" object, which
     * is merged into the log record.
     *
     * To pass in an Error *and* other fields, use the `err`
     * field name for the Error instance.
     */
    error(obj: Object, ...params: any[]): void;

    /**
     * Uses `util.format` for msg formatting.
     */
    error(format: any, ...params: any[]): void {
    };

    /**
     * Special case to log an `Error` instance to the record.
     * This adds an `err` field with exception details
     * (including the stack) and sets `msg` to the exception
     * message or you can specify the `msg`.
     */
    fatal(error: Error, ...params: any[]): void;

    /**
     * The first field can optionally be a "fields" object, which
     * is merged into the log record.
     *
     * To pass in an Error *and* other fields, use the `err`
     * field name for the Error instance.
     */
    fatal(obj: Object, ...params: any[]): void;

    /**
     * Uses `util.format` for msg formatting.
     */
    fatal(format: any, ...params: any[]): void {
    };
}
