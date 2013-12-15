module ct.core.board.action {

    export class ActionScoreUpdated implements IAction {

        constructor() {

        }

        getPrimaryId(): string {
            return null;
        }

        public perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            // TODO check whether the win condition has been met
            var boardGameState = <BoardGameState>gameState;
            var points = boardGameState.pointsSource.getPoints(boardGameState);
            if (boardGameState.level.highScore == null) {
                boardGameState.level.highScore = points;
            } else {
                boardGameState.level.highScore = Math.max(points, boardGameState.level.highScore);
            }
            return null;
        }


    }

}