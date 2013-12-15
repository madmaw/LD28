module ct.core.render {

    // renderer source of actions
    export interface IActionSource {
        start(actionHandler:(actions:IAction[])=>void): void;
        stop(): void;
    }
}