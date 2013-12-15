module ct.core.home {

    export class Level {

        public highScore: number;
        public position: Point;

        constructor(
            public id: string,
            public name: string,
            public description: string,
            public locked: boolean,
            public gameStateFactory: (level:Level) => { gameState: IGameState; actions: IAction[]; }
            
        ) {
            this.highScore = null;
            this.position = new Point();
        }

    }
} 