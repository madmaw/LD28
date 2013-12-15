module ct.core.render {

    export interface IActionRenderer {
        render(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement, animate?:boolean, onCompletionListener?: () => void): void;
    }

} 