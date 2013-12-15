module ct.core.board.action {
    export class ActionDropTile implements IAction {

        public dRow: number;

        constructor(public tile: Tile, public column: number, public fromRow: number, public toRow: number) {
            this.dRow = toRow - fromRow;
        }

        getPrimaryId(): string {
            return this.tile.id;
        }

        public perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            // remove all the consumed tiles
            var boardGameState = <BoardGameState>gameState;
            var board = boardGameState.board;

            if (this.fromRow >= 0) {
                // remove from original row?
                if (board.tiles[this.column][this.fromRow] == this.tile) {
                    board.tiles[this.column][this.fromRow] = null;
                }
            }
            // add to new row
            board.setTile(this.tile, this.column, this.toRow);
            return null;
        }
    }
} 