"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
var Settings;
(function (Settings) {
    function setFontSize(px) {
        getComputedStyle(document.documentElement).setProperty("--font-size", px + "px");
    }
    Settings.setFontSize = setFontSize;
    function getFontSize() {
        return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-size").replace("px", ""));
    }
    Settings.getFontSize = getFontSize;
})(Settings = exports.Settings || (exports.Settings = {}));
//# sourceMappingURL=settings.js.map