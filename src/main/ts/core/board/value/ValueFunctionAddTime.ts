module ct.core.board.value {

    export class ValueFunctionAddTime extends AbstractValue {
        constructor() {
            super(false, 1, "tim");
        }

        eval(params: number[]): number {
            // need this so we know how many seconds to add
            return params[0];
        }


        terminate(terminationTiles: Tile[], boardState: BoardGameState, value: number): IAction[] {
            // assume it's a replace action

            var millisecondsRemaining = boardState.millisecondsRemaining;
            if (millisecondsRemaining != null) {
                millisecondsRemaining += value * 10000;
            }
            var secondsRemainingFormatted = boardState.getSecondsRemainingFormatted(millisecondsRemaining);
            return [
                new ct.core.board.action.ActionTimeRemainingUpdated(secondsRemainingFormatted, boardState, value * 1000)
            ];
        }


    }

} 