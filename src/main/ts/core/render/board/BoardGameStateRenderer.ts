///<reference path="../HandlebarsGameStateRenderer.ts"/>

module ct.core.render.board {

    export class BoardGameStateRenderer extends HandlebarsGameStateRenderer {

        constructor(
            template: (context: any, options?: any) => string,
            params: { [_: string]: any },
            baseUrl: string,
            private headerHeight: number, 
            private homeGameState: ct.core.IGameState,
            private extols: SoundEffect[],
            private claim: SoundEffect,
            private invalid: SoundEffect
        ) {
            super(template, params, baseUrl);
        }

        render(gameState: ct.core.IGameState, div: HTMLElement): IActionSource {
            super.render(gameState, div);
            // return our own handler
            return new BoardGameStateActionSource(<ct.core.board.BoardGameState>gameState, this.homeGameState, div, this.headerHeight, this.extols, this.claim, this.invalid);
        }


        doRender(gameState: IGameState, div: HTMLElement, parameters: { [_: string]: any }): void {

            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var board = boardGameState.board;
            var boardWidth = board.tilesAcross * board.tileWidth;
            var boardHeight = board.tilesDown * board.tileHeight;
            // render as template
            parameters["boardWidth"] = boardWidth;
            parameters["boardHeight"] = boardHeight;
            parameters["tileWidth"] = board.tileWidth;
            parameters["tileHeight"] = board.tileHeight;
            super.doRender(gameState, div, parameters);
        }
    }

} 