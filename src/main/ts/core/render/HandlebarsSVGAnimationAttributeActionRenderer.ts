///<reference path="HandlebarsSVGAnimationActionRenderer.ts"/>

module ct.core.render {

    export class HandlebarsSVGAnimationAttributeActionRenderer extends HandlebarsSVGAnimationActionRenderer {

        constructor(
            animationTemplate: (context: any, options?: any) => string,
            private attributeName: string,
            private startValue: string,
            private endValue: string,
            private idPostfix: string,
            params: { [_: string]: any }, 
            private removeAllWhenDone?: boolean
        ) {
            super(animationTemplate, params);
        }

        public adjustParams(action: ct.core.IAction, gameState: ct.core.IGameState, params: { [_: string]: any }) {
            params["from"] = this.startValue;
            params["to"] = this.endValue;
            params["attributeName"] = this.attributeName;
        }

        public setToFinalState(action: ct.core.IAction, gameState: ct.core.IGameState, target: Element): void {
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var actionDrop = <ct.core.board.action.ActionDropTile>action;
            var board = boardGameState.board;
            target.setAttribute(this.attributeName, this.endValue);
            if (this.removeAllWhenDone) {
                // remove the target from it's parent
                target.parentNode.removeChild(target);
            }
        }

        public findOrCreateTarget(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement): Element {
            // attempt to find (it may exist)
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var board = boardGameState.board;
            var id = action.getPrimaryId()+this.idPostfix;
            var result: Element = document.getElementById(id);
            return result;
        }

    }

}