module ct.core.board.action {

    export class ActionScoreAccumulated implements IAction {

        constructor(public score:number, public boardGameState: BoardGameState) {
        }

        getPrimaryId(): string {
            return this.boardGameState.board.id;
        }

        perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            var boardGameState = <BoardGameState>gameState;
            boardGameState.accumulatedPoints += this.score;

            // do nothing? (what if it's zero - we actually probably want to transition to another game state)
            return null;
        }

    }

} 