"use strict";
/**
 * Using abstract class instead of interface due to lack of runtime metadata information of typescript interface
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const inversify_1 = require("inversify");
require("reflect-metadata");
let ILogger = class ILogger {
    /**
     * Uses `util.format` for msg formatting.
     */
    trace(format, ...params) {
    }
    ;
    /**
     * Uses `util.format` for msg formatting.
     */
    debug(format, ...params) {
    }
    ;
    /**
     * Uses `util.format` for msg formatting.
     */
    info(format, ...params) {
    }
    ;
    /**
     * Uses `util.format` for msg formatting.
     */
    warn(format, ...params) {
    }
    ;
    /**
     * Uses `util.format` for msg formatting.
     */
    error(format, ...params) {
    }
    ;
    /**
     * Uses `util.format` for msg formatting.
     */
    fatal(format, ...params) {
    }
    ;
};
ILogger = __decorate([
    inversify_1.injectable()
], ILogger);
exports.ILogger = ILogger;
//# sourceMappingURL=ILogger.js.map