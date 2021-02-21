declare namespace Chennyl {
    namespace Message {
        interface ISlideMessageEvent {
            on(): void;

            target: SlideMessage;
        }

        interface ISlideMessageArgs {
            html: HTMLElement;
            message: string;
            type: "error" | "info" | "warning";
        }

        interface ISlideMessageCallback {
            (event: ISlideMessageEvent, args: ISlideMessageArgs): void;
        }

        class SlideMessage {
            private static eventList: any;
            private hiding: boolean;
            private message: string;
            private type: "error" | "info" | "warning";

            public constructor(message: string, type: "error" | "info" | "warning");

            public show(): void;

            public setMessage(message: string): void;

            public static on(even: "message", callback: ISlideMessageCallback): void;

            private static emit(event: "message", self: SlideMessage, args: ISlideMessageArgs): void;

            private buildHTML(): HTMLElement;
        }
    }
}

declare module 'chennyl-ide' {
    export = Chennyl;
}

declare module 'chennyl-ide/message' {
    export = Chennyl.Message;
}

