module ct.core.board.value {

    export class ValueFunctionAccumulate extends AbstractValue {
        constructor() {
            super(false, 1, "acc");
        }

        eval(params: number[]): number {
            // need this so we know how many seconds to add
            return params[0];
        }


        terminate(terminationTiles: Tile[], boardState: BoardGameState, value: number): IAction[] {
            // assume it's a replace action
            return [
                new ct.core.board.action.ActionScoreAccumulated(value, boardState)
            ];
        }


    }

} 