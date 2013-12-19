module ct.core.board.value {
    export class ValueFunctionIncrement extends AbstractValue {

        constructor() {
            super(true, 1, 'inc');
        }

        eval(params: number[]): number {
            return params[0]+1;
        }

    }
} 