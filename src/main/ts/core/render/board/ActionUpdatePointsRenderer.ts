
module ct.core.render.board.action {

    export class ActionUpdatePointsRenderer implements IActionRenderer {

        render(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement, animate?: boolean, onCompletionListener?: () => void): void {
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var board = boardGameState.board;
            // we actually do nothing
            var points = boardGameState.pointsSource.getPoints(boardGameState);
            var element = document.getElementById(board.id + "-score");
            element.textContent = "" + points;
            if (onCompletionListener) {
                onCompletionListener();
            }
        }

    }

} 