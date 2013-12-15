module ct.core.render.home {

    export class HomeGameStateActionSource implements IActionSource {

        private actionHandler: (actions: IAction[]) => void;

        constructor(private gameState: ct.core.home.HomeGameState, private div: HTMLElement) {

        }

        start(actionHandler: (actions: IAction[]) => void): void {

            // find the svg elements for each level and add listeners
            for (var i in this.gameState.levels) {
                // descope
                var f = () => {

                    var level = this.gameState.levels[i];
                    var levelElement = document.getElementById(level.id);
                    levelElement.onclick = () => {
                        var actions = [new ct.core.home.action.ActionLevelSelect(level)];
                        // select level action
                        actionHandler(actions);
                    };
                };
                f();
            }
        }

        stop(): void {
        }

    }
} 