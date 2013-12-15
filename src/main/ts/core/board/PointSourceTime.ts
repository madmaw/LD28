module ct.core.board {

    export class PointSourceTime implements IPointsSource {

        name: string = "time";

        getPoints(gameState: BoardGameState): number {
            var time = gameState.startTime;
            var result;
            if (time != null) {
                result = Math.floor(((new Date()).getTime() - time.getTime()) / 1000);
            } else {
                result = 0;
            }
            return result;
        }

    }

} 