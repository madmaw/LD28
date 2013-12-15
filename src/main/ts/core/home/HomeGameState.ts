module ct.core.home {

    export class HomeGameState implements IGameState {

        constructor(
            public levels: Level[]
        ) {

        }

        public getId(): string {
            return "";
        }

        public getName(): string {
            return "Code Tower";
        }
    }
}