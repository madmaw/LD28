module ct.core.board.action {
    export class ActionDestroyTile implements IAction {

        constructor(
            private tile: Tile
        ) {
        }

        getPrimaryId(): string {
            return this.tile.id;
        }


        public perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            // remove all the consumed tiles
            var boardGameState = <BoardGameState>gameState;
            var board = boardGameState.board;
            var pos = this.tile.position;
            // clear out that spot? - probably not actually neccessary
            board.tiles[pos.x][pos.y] = null;
            return null;
        }

    }
} 