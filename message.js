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
        var html = this.buildHTML();
        SlideMessage.emit("message", this, {
            html: html,
            message: this.message,
            type: this.type
        });
        this.hiding = false;
    };
    SlideMessage.prototype.setMessage = function (message) {
        this.message = message;
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
    SlideMessage.prototype.buildHTML = function () {
        var div = document.createElement("div");
        div.style.padding = "2rem";
        div.style.position = "fixed";
        div.style.right = "20px";
        div.style.bottom = "20px";
        var p = document.createElement("p");
        p.innerHTML = this.message;
        div.appendChild(p);
        return div;
    };
    SlideMessage.eventList = {
        onMessage: [],
    };
    return SlideMessage;
}());
exports.SlideMessage = SlideMessage;
//# sourceMappingURL=message.js.map