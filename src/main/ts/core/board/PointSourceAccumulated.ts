module ct.core.board {

    export class PointsSourceAccumulated implements IPointsSource {

        name: string = "accumulated";

        getPoints(gameState: BoardGameState): number {
            return gameState.accumulatedPoints;
        }
    }
} 