module ct.core.board.value {
    export class ValueNumeric extends AbstractValue {

        constructor(public value: number) {
            super(true, 0, ""+value);
        }

        eval(params: number[]): number {
            return this.value;
        }

    }
} 