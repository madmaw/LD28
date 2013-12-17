module ct.core.board {

    export class PointSourceZero implements IPointsSource {

        name: string = "zero";

        getPoints(gameState: BoardGameState): number {
            var result = 0;
            var board = gameState.board;
            for (var x = 0; x < board.tilesAcross; x++) {
                for (var y = 0; y < board.tilesDown; y++) {
                    var tile = board.tiles[x][y];
                    if (tile != null && tile.value instanceof ct.core.board.value.ValueNumeric) {
                        var numericValue = <ct.core.board.value.ValueNumeric>tile.value;
                        result += numericValue.value;
                    }
                }
            }
            return -Math.abs(result);
        }



    }

} 