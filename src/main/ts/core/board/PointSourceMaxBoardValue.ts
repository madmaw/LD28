module ct.core.board {

    export class PointsSourceMaxBoardValue implements IPointsSource {

        name: string = "maximum value";

        getPoints(gameState: BoardGameState): number {
            var max = null;
            var board = gameState.board;
            for (var x = 0; x < board.tilesAcross; x++) {
                for (var y = 0; y < board.tilesDown; y++) {
                    var tile = board.tiles[x][y];
                    if (tile.value instanceof ct.core.board.value.ValueNumeric) {
                        var numericValue = <ct.core.board.value.ValueNumeric>tile.value;
                        var value = numericValue.value;
                        if (max == null) {
                            max = value;
                        } else {
                            max = Math.max(max, value);
                        }
                    }
                }
            }
            return max;
        }
    }
} 