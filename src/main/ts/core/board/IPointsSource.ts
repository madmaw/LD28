module ct.core.board {

    export interface IPointsSource {

        name: string;

        getPoints(gameState: BoardGameState): number;        
    }
} 