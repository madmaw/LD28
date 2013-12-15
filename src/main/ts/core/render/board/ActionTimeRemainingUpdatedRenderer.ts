module ct.core.render.board.action {

    export class ActionTimeRemainingUpdatedRenderer implements IActionRenderer {

        render(action: ct.core.IAction, gameState: ct.core.IGameState, div: HTMLElement, animate?: boolean, onCompletionListener?: () => void): void {
            var timeAction = <ct.core.board.action.ActionTimeRemainingUpdated>action;
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var board = boardGameState.board;
            var element = document.getElementById(board.id + "-time");
            element.textContent = timeAction.secondsRemainingFormatted;
            if (onCompletionListener) {
                onCompletionListener();
            }
        }

    }

} 