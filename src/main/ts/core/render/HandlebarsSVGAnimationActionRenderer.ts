module ct.core.render {

    export class HandlebarsSVGAnimationActionRenderer implements IActionRenderer {

        private static _animationId: number = 0;

        constructor(private template: (context: any, options?: any) => string, private params: { [_: string]: any }) {

        }

        render(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement, animate?: boolean, onCompletionListener?: (action:ct.core.IAction, gameState:ct.core.IGameState) => void): void {
            var target = this.findOrCreateTarget(action, gameState, div);
            if (animate) {
                var animationId = "anim-" + HandlebarsSVGAnimationActionRenderer._animationId;
                HandlebarsSVGAnimationActionRenderer._animationId++;
                this.params["gameState"] = gameState;
                this.params["action"] = action;
                this.params["animationId"] = animationId;
                this.adjustParams(action, gameState, this.params);
                var animationSVG = this.template(this.params);
                var animationNode = this.parseSVG(animationSVG, animationId);
                // clean up
                animationNode.addEventListener('endEvent', () => {
                    this.setToFinalState(action, gameState, target);
                    target.removeChild(animationNode);
                    if (onCompletionListener) {
                        onCompletionListener(action, gameState);
                    }
                });
                target.appendChild(animationNode);
                // force it to start now (instead of at the start of the document, which was ages ago)
                (<any>animationNode).beginElement();
                
            } else {
                this.setToFinalState(action, gameState, target);
                if (onCompletionListener) {
                    onCompletionListener(action, gameState);
                }
            }
        }

        public adjustParams(action: ct.core.IAction, gameState: ct.core.IGameState, params: { [_: string]: any }) {

        }

        public setToFinalState(action: ct.core.IAction, gameState: ct.core.IGameState, target: Element): void {
            // do nothing, but you should override
        }

        public findOrCreateTarget(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement): Element {
            return div;
        }

        public parseSVG(s: string, targetId: string): Element {
            var div = <HTMLElement>document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
            div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
            // TOOD this without jQuery
            return $(div).find("#" + targetId).get(0);
            //return div.document.getElementById(targetId);
        }    

    }

} 