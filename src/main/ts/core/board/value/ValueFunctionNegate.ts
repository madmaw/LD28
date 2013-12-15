module ct.core.board.value {
    export class ValueFunctionNegate extends AbstractValue {

        constructor() {
            super(true, 1, 'neg');
        }

        eval(params: number[]): number {
            return -(params[0]);
        }
    }
}