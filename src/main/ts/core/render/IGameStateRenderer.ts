module ct.core.render {
    export interface IGameStateRenderer {

        render(gameState: ct.core.IGameState, div: HTMLElement): IActionSource;


    }
}