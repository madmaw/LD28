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
                var animationNodes = HandlebarsSVGAnimationActionRenderer.parseSVG(animationSVG);
                var animationCompletionCount = 0;
                for (var i in animationNodes) {
                    var animationNode = animationNodes[i];
                    console.log("animating "+animationNode.tagName);
                    // clean up
                    animationNode.addEventListener('endEvent', () => {
                        this.setToFinalState(action, gameState, target);
                        target.removeChild(animationNode);
                        animationCompletionCount++;
                        if (animationCompletionCount == animationNodes.length) {
                            this.onCompletion(true);
                            if (onCompletionListener) {
                                onCompletionListener(action, gameState);
                            }
                        }
                    });
                    target.appendChild(animationNode);
                    // force it to start now (instead of at the start of the document, which was ages ago)
                    (<any>animationNode).beginElement();
                }
                
            } else {
                this.setToFinalState(action, gameState, target);
                this.onCompletion(false);
                if (onCompletionListener) {
                    onCompletionListener(action, gameState);
                }
            }
        }

        public onCompletion(animated:boolean) {

        } 

        public adjustParams(action: ct.core.IAction, gameState: ct.core.IGameState, params: { [_: string]: any }) {

        }

        public setToFinalState(action: ct.core.IAction, gameState: ct.core.IGameState, target: Element): void {
            // do nothing, but you should override
        }

        public findOrCreateTarget(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement): Element {
            return div;
        }

        public static parseSVG(s: string, targetId?: string): Element[] {
            var div = <HTMLElement>document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
            div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
            // TOOD this without jQuery
            //return div.document.getElementById(targetId);
            var result = [];
            for (var i in div.childNodes) {
                var childNode = div.childNodes[i];
                for (var j in childNode.childNodes) {
                    var c = childNode.childNodes[j];
                    if ((<any>c).tagName != null && (targetId == null || (<Element>c).getAttribute("id") == targetId)) {
                        result.push(c);
                    }
                }
            }
            return result;
        }    

    }

} 