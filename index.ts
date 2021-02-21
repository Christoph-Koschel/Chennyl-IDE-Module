export namespace Chennyl { // TODO delete export
    export namespace Settings {
        export function setFontSize(px: number): void {
            getComputedStyle(document.documentElement).setProperty("--font-size",px + "px");
        }

        export function getFontSize(): number {
            return parseFloat(getComputedStyle(document.documentElement).
                        getPropertyValue("--font-size").
                        replace("px","")
            );
        }
    }

    export namespace Message {

        interface IMessageEvent {
            on(): void;
            target: SlideMessage;
        }

        interface IMessageArgs {
            html: HTMLElement;
            message: string;
            type: "error" | "info" | "warning";
        }

        interface IMessageCallback {
            (event, args): void;
        }

        export class SlideMessage {
            private static eventList: any = {
                onMessage: [],
            };
            private hiding: boolean;
            private message: string;
            private type: "error" | "info" | "warning";

            public constructor(message: string  = "", type: "error" | "info" | "warning") {
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

            public hide(): void {
                this.hiding = true;
            }

            public isHide(): boolean {
                return this.hiding;
            }

            public setMessage(message: string): void {
                this.message = message;
            }

            public static on(even: "message", callback: IMessageCallback): void {
                this.eventList.onMessage.push(callback);
            }

            private static emit(event: "message",self: SlideMessage, args: IMessageArgs): void {

                function runCallbacks(callbacks: Array<IMessageCallback>) {
                    const event: IMessageEvent = {
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

                let p = document.createElement("p");
                p.innerHTML = this.message;

                div.appendChild(p);
                return div;
            }
        }
    }
}
// TODO unmark this
// declare module 'chennyl-IDE' {
//     export = Chennyl;
// }
//
// declare module 'chennyl-IDE/settings' {
//     export = Chennyl.Settings;
// }
//
// declare module 'chennyl-IDE/message' {
//     export = Chennyl.Message;
// }
