export namespace Message {

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
            const html: HTMLElement = this.buildHTML();
            SlideMessage.emit("message", this, {
                html: html,
                message: this.message,
                type: this.type
            });
            this.hiding = false;
        }

        public setMessage(message: string): void {
            this.message = message;
        }

        public static on(even: "message", callback: ISlideMessageCallback): void {
            this.eventList.onMessage.push(callback);
        }

        private static emit(event: "message", self: SlideMessage, args: ISlideMessageArgs): void {

            function runCallbacks(callbacks: Array<ISlideMessageCallback>) {
                const event: ISlideMessageEvent = {
                    target: self,
                    on() {
                    }
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

        private buildHTML(): HTMLElement {
            let div = document.createElement("div");
            div.style.padding = "2rem";
            div.style.position = "fixed";
            div.style.right = "20px";
            div.style.bottom = "20px";
            let p = document.createElement("p");
            p.innerHTML = this.message;

            div.appendChild(p);
            return div;
        }
    }
}
