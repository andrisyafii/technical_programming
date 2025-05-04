"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentEpochTime = exports.formatEpochTime = void 0;
const formatEpochTime = (epochTime) => {
    return new Date(epochTime * 1000).toLocaleString();
};
exports.formatEpochTime = formatEpochTime;
const getCurrentEpochTime = () => {
    return Math.floor(Date.now() / 1000);
};
exports.getCurrentEpochTime = getCurrentEpochTime;
