"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFontSize = exports.setFontSize = void 0;
function setFontSize(px) {
    getComputedStyle(document.documentElement).setProperty("--font-size", px + "px");
}
exports.setFontSize = setFontSize;
function getFontSize() {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-size").replace("px", ""));
}
exports.getFontSize = getFontSize;
//# sourceMappingURL=settings.js.map