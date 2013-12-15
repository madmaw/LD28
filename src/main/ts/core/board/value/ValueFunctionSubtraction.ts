module ct.core.board.value {
    export class ValueFunctionSubtraction extends AbstractValue {

        constructor() {
            super(true, 2, '-');
        }

        eval(params: number[]): number {
            var result = params[0];
            for (var i = 1; i < params.length; i++) {
                var param = params[i];
                result -= param;
            }
            // TODO check for overflows
            return result;
        }
    }
}