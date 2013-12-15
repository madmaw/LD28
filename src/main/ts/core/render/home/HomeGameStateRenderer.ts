///<reference path="../HandlebarsGameStateRenderer.ts"/>

module ct.core.render.home {

    export class HomeGameStateRenderer extends HandlebarsGameStateRenderer {

        constructor(
            template: (context: any, options?: any) => string,
            params: { [_: string]: any },
            baseUrl: string,
            private windowWidth: number, 
            private windowHeight: number
        ) {
            super(template, params, baseUrl);
        }

        render(gameState: ct.core.IGameState, div: HTMLElement): IActionSource {
            super.render(gameState, div);
            // return our own handler
            //return new BoardGameStateActionSource(<ct.core.board.BoardGameState>gameState, div, this.headerHeight);
            var homeGameState = <ct.core.home.HomeGameState>gameState;
            return new HomeGameStateActionSource(homeGameState, div);
        }


        doRender(gameState: IGameState, div: HTMLElement, parameters: { [_: string]: any }): void {

            var homeGameState = <ct.core.home.HomeGameState>gameState;

            var cols = Math.max(2, Math.floor(this.windowWidth / 300));

            var selectionWidth = this.windowWidth / (cols+1);
            
            // set the positions of all the levels
            var margin = (this.windowWidth - selectionWidth * cols) / (cols+1);
            
            var selectionHeight = Math.min(selectionWidth, (this.windowHeight - margin) / (Math.ceil(homeGameState.levels.length / cols)*2));



            for (var i in homeGameState.levels) {
                var row = Math.floor(i / cols);
                var col = i % cols;
                var x = margin * (col + 1) + col * selectionWidth;
                var y = margin * (row + 1) + row * selectionHeight;
                var level = homeGameState.levels[i];
                level.position.x = x;
                level.position.y = y;
            }

            // render as template
            parameters["windowWidth"] = this.windowWidth;
            parameters["windowHeight"] = this.windowHeight;
            parameters["selectionWidth"] = selectionWidth;
            parameters["selectionHeight"] = selectionHeight;
            parameters["selectionWidthDiv2"] = selectionWidth / 2;
            parameters["selectionHeightDiv2"] = selectionHeight / 2;
            parameters["fontSize"] = selectionWidth / 10;

            super.doRender(gameState, div, parameters);
        }
    }

}