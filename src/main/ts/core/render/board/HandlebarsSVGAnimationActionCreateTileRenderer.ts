///<reference path="../HandlebarsSVGAnimationAttributeActionRenderer.ts"/>

module ct.core.render.board {

    export class HandlebarsSVGAnimationActionCreateTileRenderer extends HandlebarsSVGAnimationAttributeActionRenderer {

        constructor(
            animationTemplate: (context: any, options?: any) => string,
            private tileTemplate: (context: any, options?: any) => string,
            private tileColor: string,
            params: { [_: string]: any }
            ) {
            super(animationTemplate, "opacity", "0", "1", "", params);
        }

        public findOrCreateTarget(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement): Element {
            // attempt to find (it may exist)
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var actionCreate = <ct.core.board.action.ActionCreateTile>action;
            var board = boardGameState.board;
            var tile = actionCreate.tile;
            var id = tile.id;
            var tileSVG = this.tileTemplate({ tile: tile, gameState: gameState, tileColor: this.tileColor });
            var result = this.parseSVG(tileSVG, id)[0];
            var boardTiles = document.getElementById(board.id + "-tiles");
            boardTiles.appendChild(result);
            return result;
        }

    }

}