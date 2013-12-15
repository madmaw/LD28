module ct.core.board.action {
    export class ActionCreateTile implements IAction {

        constructor(public tile: Tile, public x:number, public y: number) {
            tile.position.x = x;
            tile.position.y = y;
        }

        getPrimaryId(): string {
            return this.tile.id;
        }

        public perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            var boardGameState = <BoardGameState>gameState;
            var board = boardGameState.board;
            board.setTile(this.tile, this.x, this.y);
            return null;
        }
    }
} 