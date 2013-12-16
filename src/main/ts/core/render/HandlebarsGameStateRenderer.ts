module ct.core.render {

    export class HandlebarsGameStateRenderer implements IGameStateRenderer {

        constructor(private template: (context: any, options?: any) => string, private params: { [_: string]: any }, private baseUrl:string) {
        }

        render(gameState: IGameState, div: HTMLElement): IActionSource {
            this.params["gameState"] = gameState;
            this.doRender(gameState, div, this.params);
            // push the URL onto the stack
            var id = gameState.getId();
            window.history.pushState(id, gameState.getName(), this.baseUrl+"#"+id);
            return null;
        }

        public doRender(gameState: IGameState, div: HTMLElement, parameters: { [_: string]: any }) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            var html = this.template(parameters);
            var nodes = HandlebarsSVGAnimationActionRenderer.parseSVG(html);
            for (var i in nodes) {
                var node = nodes[i];
                div.appendChild(node);
            }
        }
    }

} 