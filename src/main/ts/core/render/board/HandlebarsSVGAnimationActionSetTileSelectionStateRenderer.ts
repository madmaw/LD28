///<reference path="../HandlebarsSVGAnimationAttributeActionRenderer.ts"/>

module ct.core.render.board {

    export class HandlebarsSVGAnimationActionSetTileSelectionStateRenderer extends HandlebarsSVGAnimationActionRenderer {

        constructor(
            animationTemplate: (context: any, options?: any) => string,
            private tileColor: string,
            private validTileColor: string, 
            private invalidTileColor: string, 
            private extraneousTileColor: string,
            private badParameterTileColor: string,
            private idPostfix: string,
            params: { [_: string]: any }
        ) {
            super(animationTemplate, params);
        }

        public adjustParams(action: ct.core.IAction, gameState: ct.core.IGameState, params: { [_: string]: any }) {

            var actionSetTileSelectionState = <ct.core.board.action.ActionSetTileSelectionState>action;
            var startState = actionSetTileSelectionState.originalSelectionState;
            var endState = actionSetTileSelectionState.newSelectionState;
            var startColor = this.getColor(startState);
            var endColor = this.getColor(endState);

            params["from"] = startColor;
            params["to"] = endColor;
            params["attributeName"] = "fill";
        }

        public getColor(state: ct.core.board.TileSelectionState): string {
            var result;
            if (state == ct.core.board.TileSelectionState.VALID) {
                result = this.validTileColor;
            } else if (state == ct.core.board.TileSelectionState.INVALID) {
                result = this.invalidTileColor;
            } else if (state == ct.core.board.TileSelectionState.EXTRANEOUS) {
                result = this.extraneousTileColor;
            } else if (state == ct.core.board.TileSelectionState.BAD_PARAMETER) {
                result = this.badParameterTileColor;
            } else {
                result = this.tileColor;
            }
            return result;
        }

        public setToFinalState(action: ct.core.IAction, gameState: ct.core.IGameState, target: Element): void {
            var actionSetTileSelectionState = <ct.core.board.action.ActionSetTileSelectionState>action;
            var color = this.getColor(actionSetTileSelectionState.newSelectionState);
            target.setAttribute("fill", color);
        }


        public findOrCreateTarget(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement): Element {
            // attempt to find (it may exist)
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var board = boardGameState.board;
            var id = action.getPrimaryId() + this.idPostfix;
            var result: Element = document.getElementById(id);
            return result;
        }

    }

}