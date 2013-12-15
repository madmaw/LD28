module ct.core.home.action {

    export class ActionLevelSelect implements IAction {
        constructor(private level:Level) {

        }

        getPrimaryId(): string {
            return this.level.id;
        }

        perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            // anything else?
            return this.level.gameStateFactory(this.level);
        }
    }

}