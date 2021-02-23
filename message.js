"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmWindow = exports.SlideMessage = void 0;
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
var ConfirmWindow = /** @class */ (function () {
    function ConfirmWindow(message, type) {
        if (message === void 0) { message = ""; }
        if (type === void 0) { type = "info"; }
        this.eventList = {
            change: []
        };
        this.message = message;
        this.type = type;
    }
    ConfirmWindow.prototype.on = function (event, callback) {
        this.eventList[event].push(callback);
    };
    ConfirmWindow.prototype.show = function () {
        var _this = this;
        var args = {
            emit: function (event, args) {
                _this.objEmit(event, args);
            },
            message: this.message,
            type: this.type
        };
        ConfirmWindow.staticEmit("message", args);
    };
    ConfirmWindow.prototype.setMessage = function (message) {
        this.message = message;
    };
    ConfirmWindow.prototype.setType = function (type) {
        this.type = type;
    };
    ConfirmWindow.prototype.objEmit = function (event, args) {
        var callbacks = this.eventList[event];
        for (var i in callbacks) {
            callbacks[i](args);
        }
    };
    ConfirmWindow.staticEmit = function (event, args) {
        var callbacks = ConfirmWindow.staticEventList[event];
        for (var i in callbacks) {
            callbacks[i](args);
        }
    };
    ConfirmWindow.on = function (event, callback) {
        ConfirmWindow.staticEventList[event].push(callback);
    };
    ConfirmWindow.YES = 1;
    ConfirmWindow.NO = 0;
    ConfirmWindow.staticEventList = {
        message: []
    };
    return ConfirmWindow;
}());
exports.ConfirmWindow = ConfirmWindow;
//# sourceMappingURL=message.js.map