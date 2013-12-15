///<reference path="../HandlebarsSVGAnimationActionRenderer.ts"/>

module ct.core.render.board {

    export class HandlebarsSVGAnimationActionDropTileRenderer extends HandlebarsSVGAnimationActionRenderer {

        constructor(
            animationTemplate: (context: any, options?: any) => string,
            private tileTemplate: (context: any, options?: any) => string,
            private tileColor: string,
            params: { [_: string]: any }
        ) {
            super(animationTemplate, params);
        }

        public setToFinalState(action: ct.core.IAction, gameState: ct.core.IGameState, target: Element): void {
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var actionDropTile = <ct.core.board.action.ActionDropTile>action;
            var board = boardGameState.board;
            var x = actionDropTile.column * board.tileWidth;
            var y = actionDropTile.toRow * board.tileHeight;
            target.setAttribute("transform", "translate(" + x + "," + y + ")");
        }

        public findOrCreateTarget(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement): Element {
            // attempt to find (it may exist)
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var actionDrop = <ct.core.board.action.ActionDropTile>action;
            var board = boardGameState.board;
            var tile = actionDrop.tile;
            var id = tile.id;
            var result: Element = document.getElementById(id);
            if (!result) {
                var tileSVG = this.tileTemplate({ tile: tile, gameState: gameState, tileColor: this.tileColor });
                result = this.parseSVG(tileSVG, id);
                var boardTiles = document.getElementById(board.id + "-tiles");
                boardTiles.appendChild(result);
            }
            return result;
        }

    }

}