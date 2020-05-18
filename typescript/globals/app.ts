/// <reference path="globals.d.ts" />

class Utility {
    static displayGlobalVar(): void {
        display();
    }
}
window.onload = () => Utility.displayGlobalVar();
