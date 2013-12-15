module ct.core.board.value {
    export class ValueFunctionMultiplication extends AbstractValue {

        constructor() {
            super(true, 2, "*");
        }


        eval(params: number[]): number {
            var result = 1;
            for (var i in params) {
                var param = params[i];
                result *= param;
            }
            // TODO check for overflows
            return result;
        }

    }
}