///<reference path="ActionSetTileSelectionState.ts"/>

module ct.core.board.action {

    export class ActionSelectTile extends ActionSetTileSelectionState {

        constructor(tile: Tile, selectionState:TileSelectionState) {
            super(tile, selectionState);
        }

        perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; } {
            var boardGameState = <BoardGameState>gameState;
            var selectedTileChain = boardGameState.selectedTileChain;
            selectedTileChain.push(this.tile);
            // add the tile to the list of selected tiles 
            return super.perform(gameState);
        }

    }

} 