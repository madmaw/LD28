module ct.core.board {

    export interface ITileSource {

        create(quantity: number): Tile[];

        replace(board: Board, tiles: Tile[]): Tile[];
    }

}