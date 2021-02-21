"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideMessage = void 0;
var SlideMessage = /** @class */ (function () {
    function SlideMessage(message, type) {
        if (message === void 0) { message = ""; }
        this.hiding = true;
        this.message = message;
        this.type = type;
    }
    SlideMessage.prototype.show = function () {
        SlideMessage.emit("message", this, {
            message: this.message,
            type: this.type
        });
        this.hiding = false;
    };
    SlideMessage.prototype.setMessage = function (message) {
        this.message = message;
    };
    SlideMessage.prototype.setType = function (type) {
        this.type = type;
    };
    SlideMessage.on = function (even, callback) {
        this.eventList.onMessage.push(callback);
    };
    SlideMessage.emit = function (event, self, args) {
        function runCallbacks(callbacks) {
            var event = {
                target: self,
                on: function () {
                }
            };
            callbacks.forEach(function (value) {
                value(event, args);
            });
        }
        switch (event) {
            case "message":
                runCallbacks(this.eventList.onMessage);
        }
    };
    SlideMessage.eventList = {
        onMessage: [],
    };
    return SlideMessage;
}());
exports.SlideMessage = SlideMessage;
//# sourceMappingURL=message.js.map