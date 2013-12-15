module ct.core.board.action {

    export class ActionTimeRemainingUpdated implements IAction {

        constructor(public secondsRemainingFormatted: string, public boardGameState:BoardGameState, private bonusTime?:number, private startTime?:Date, private gameState?:IGameState) {
        }

        getPrimaryId(): string {
            return this.boardGameState.board.id;
        }

        perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            var boardGameState = <BoardGameState>gameState;
            if (this.bonusTime) {
                boardGameState.gameplayMilliseconds += this.bonusTime;
            }
            if (this.startTime) {
                boardGameState.startTime = this.startTime;
            }
            
            // do nothing? (what if it's zero - we actually probably want to transition to another game state)
            return { gameState: this.gameState, actions: [] };
        }

    }

} 