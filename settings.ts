export namespace Settings {
    export function setFontSize(px: number): void {
        getComputedStyle(document.documentElement).setProperty("--font-size", px + "px");
    }

    export function getFontSize(): number {
        return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-size").replace("px", "")
        );
    }
}
