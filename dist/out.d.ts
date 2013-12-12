declare class Greeter {
    public element: HTMLElement;
    public span: HTMLElement;
    public timerToken: number;
    constructor(element: HTMLElement);
    public start(): void;
    public stop(): void;
}
declare function parseSVG(s: string): Node;
