module ct.core.board {
    export interface IValue {

        evalReturnsNumber: boolean;

        numberOfParams: number;

        eval(params: number[]): number;

        terminate(terminatiedTiles:Tile[], boardState:BoardGameState, value: number): IAction[];

        toString(): string;
    }
} 