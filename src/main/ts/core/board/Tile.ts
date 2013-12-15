module ct.core.board {



    export class Tile {

        private static _tileId: number = 0;

        public position: Point;
        public board: Board;
        public symbol: string;
        public id: string;
        public selectionState: TileSelectionState;

        constructor(
            public value: IValue
        ) {
            this.id = "tile-" + Tile._tileId;
            Tile._tileId++;
            this.position = new Point();
            this.symbol = value.toString();
            this.selectionState = TileSelectionState.UNSELECTED;
        }
    }

}