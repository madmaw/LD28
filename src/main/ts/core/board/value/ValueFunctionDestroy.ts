module ct.core.board.value {

    export class ValueFunctionDestroy extends AbstractValue {
        constructor() {
            super(false, 1, "kil");
        }

        eval(params: number[]): number {
            // need this so we know how many seconds to add
            return params[0];
        }

    }

} 