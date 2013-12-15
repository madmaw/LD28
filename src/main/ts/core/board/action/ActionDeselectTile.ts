module ct.core.board.action {

    export class ActionDeselectTile implements ct.core.IAction {

        constructor(public tile: Tile) {

        }

        getPrimaryId(): string {
            return this.tile.id;
        }

        perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            // remove from the selected list
            var boardGameState = <ct.core.board.BoardGameState>gameState;
            var index = boardGameState.selectedTileChain.indexOf(this.tile);
            if (index >= 0) {
                boardGameState.selectedTileChain.splice(index, 1);
            }
            this.tile.selectionState = TileSelectionState.UNSELECTED;
            return null;
        }
    }

} 