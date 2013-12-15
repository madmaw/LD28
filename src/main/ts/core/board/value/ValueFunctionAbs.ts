module ct.core.board.value {
    export class ValueFunctionAbs extends AbstractValue {

        constructor() {
            super(true, 1, 'abs');
        }

        eval(params: number[]): number {
            return Math.abs(params[0]);
        }

    }
} 