/* region slide message */
import {createHash} from "crypto";

interface ISlideMessageEvent {
    target: SlideMessage;
}

interface ISlideMessageArgs {
    message: string;
    type: "error" | "info" | "warning";
}

interface ISlideMessageCallback {
    (event: ISlideMessageEvent, args: ISlideMessageArgs): void;
}

export class SlideMessage {
    private static eventList: any = {
        onMessage: [],
    };
    private hiding: boolean;
    private message: string;
    private type: "error" | "info" | "warning";

    public constructor(message: string = "", type: "error" | "info" | "warning") {
        this.hiding = true;
        this.message = message;
        this.type = type;
    }

    public show(): void {
        SlideMessage.emit("message", this, {
            message: this.message,
            type: this.type
        });
        this.hiding = false;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

    public setType(type: "error" | "info" | "warning") {
        this.type = type;
    }

    public static on(even: "message", callback: ISlideMessageCallback): void {
        this.eventList.onMessage.push(callback);
    }

    private static emit(event: "message", self: SlideMessage, args: ISlideMessageArgs): void {

        function runCallbacks(callbacks: Array<ISlideMessageCallback>) {
            const event: ISlideMessageEvent = {
                target: self,
            }
            callbacks.forEach((value) => {
                value(event, args);
            });
        }

        switch (event) {
            case "message":
                runCallbacks(this.eventList.onMessage);
        }
    }
}

/* endregion */

interface IConfirmCallback {
    (args: IConfirmArgs): void;
}

interface IConfirmArgs {
    status: 0 | 1;
    message: string;
    type: "error" | "info" | "warning";
}

interface IConfirmStaticCallback {
    (event: IConfirmStaticEvent): void;
}

interface IConfirmStaticEvent {
    emit(event: "change", args: IConfirmArgs): void;

    message: string;
    type: "error" | "info" | "warning";
}

export class ConfirmWindow {
    public static YES: 1 = 1;
    public static NO: 0 = 0;

    private message: string;
    private type: "error" | "info" | "warning";

    private static staticEventList: any = {
        message: []
    }

    private eventList: any = {
        change: []
    }

    constructor(message: string = "", type: "error" | "info" | "warning" = "info") {
        this.message = message;
        this.type = type;
    }

    public on(event: "change", callback: IConfirmCallback) {
        this.eventList[event].push(callback);
    }

    public show() {
        const args: IConfirmStaticEvent = {
            emit: (event: "change", args: IConfirmArgs) => {
                this.objEmit(event, args);
            },
            message: this.message,
            type: this.type
        }
        ConfirmWindow.staticEmit("message", args);
    }

    public setMessage(message: string) {
        this.message = message;
    }

    public setType(type: "error" | "info" | "warning") {
        this.type = type;
    }

    private objEmit(event: "change", args: IConfirmArgs) {
        const callbacks = this.eventList[event];
        for (let i in callbacks) {
            callbacks[i](args)
        }
    }

    private static staticEmit(event: "message", args: IConfirmStaticEvent) {
        const callbacks = ConfirmWindow.staticEventList[event];
        for (let i in callbacks) {
            callbacks[i](args)
        }
    }

    public static on(event: "message", callback: IConfirmStaticCallback) {
        ConfirmWindow.staticEventList[event].push(callback);
    }
}
