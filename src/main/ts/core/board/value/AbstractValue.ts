module ct.core.board.value {

    export class AbstractValue implements IValue {

         
        constructor(public evalReturnsNumber: boolean, public numberOfParams: number, private stringRepresentation: string) {

        }

        eval(params: number[]): number {
            // TODO override
            return null;
        }


        terminate(terminationTiles: Tile[], boardState: BoardGameState, value: number): IAction[]{
            // assume it's a replace action
            var terminationTile = terminationTiles[0];
            var createdTile = new Tile(new ValueNumeric(value)); 
            return [new ct.core.board.action.ActionCreateTile(createdTile, terminationTile.position.x, terminationTile.position.y)];
        }

        toString(): string {
            return this.stringRepresentation;
        }
        

    }

}