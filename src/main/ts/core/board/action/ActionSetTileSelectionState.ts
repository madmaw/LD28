module ct.core.board.action {

    export class ActionSetTileSelectionState implements IAction {

        public originalSelectionState: TileSelectionState;
        constructor(public tile: Tile, public newSelectionState: TileSelectionState) {
            this.originalSelectionState = tile.selectionState;
        }

        getPrimaryId(): string {
            return this.tile.id;
        }

        perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            this.tile.selectionState = this.newSelectionState;
            return null;
        }

    }

} 