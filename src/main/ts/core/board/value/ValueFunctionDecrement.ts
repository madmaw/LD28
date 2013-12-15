module ct.core.board.value {
    export class ValueFunctionDecrement extends AbstractValue {

        constructor() {
            super(true, 1, '--');
        }

        eval(params: number[]): number {
            return params[0] - 1;
        }

    }
}  