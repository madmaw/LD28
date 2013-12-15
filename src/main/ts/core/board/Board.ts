module ct.core.board {
    export class Board {

        public static _boardId: number = 0;

        public tiles: Array<Array<Tile>>;
        public id: string;

        constructor(public tilesAcross: number, public tilesDown: number, public tileWidth: number, public tileHeight: number) {
            this.id = "board-" + Board._boardId;
            Board._boardId++;
            this.tiles = new Array<Array<Tile>>();
            for (var x = 0; x < tilesAcross; x++) {
                var column = new Array<Tile>();
                for (var y = 0; y < tilesDown; y++) {
                    column.push(null);
                }
                this.tiles.push(column);
            }
        }

        public setTile(tile:Tile, x:number, y:number): void {
            tile.position.x = x;
            tile.position.y = y;
            tile.board = this;
            this.tiles[x][y] = tile;
        }
    }
} 