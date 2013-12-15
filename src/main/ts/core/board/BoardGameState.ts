module ct.core.board {

    export class BoardGameState implements IGameState {

        public selectedTileChain: Tile[];
        public accumulatedPoints: number;
        public startTime: Date; 

        constructor(public level: ct.core.home.Level, public board: Board, public tileSource: ITileSource, public pointsSource: IPointsSource, public gameplayMilliseconds?:number) {
            this.selectedTileChain = [];
            this.startTime = null;
            this.accumulatedPoints = 0;
        }

        public getId(): string {
            return this.level.id;
        }

        public getName(): string {
            return this.level.name;
        }

        get millisecondsRemaining(): number {
            var result;
            if (this.gameplayMilliseconds != null) {

                if (this.startTime != null) {
                    result = this.gameplayMilliseconds - ((new Date()).getTime() - this.startTime.getTime());
                } else {
                    result = this.gameplayMilliseconds;
                }
            } else {
                result = null;
            }
            return result;
        }

        get secondsRemainingFormatted(): string {
            var milliseconds = this.millisecondsRemaining;
            return this.getSecondsRemainingFormatted(milliseconds);
        }

        getSecondsRemainingFormatted(milliseconds) {
            var result;
            if (milliseconds != null) {
                var seconds = milliseconds / 1000;
                var minutes = Math.floor(seconds / 60);
                seconds = seconds % 60;
                result = "" + seconds;
                var dotIndex = result.indexOf('.');
                if (dotIndex < 0) {
                    dotIndex = result.length;
                    result += ".0";
                } else {
                    result = result.substring(0, dotIndex + 2);
                }
                if (minutes > 0) {
                    while (dotIndex < 2) {
                        result = "0" + result;
                        dotIndex++;
                    }
                    result = "" + minutes + ":" + result;
                }
            } else {
                result = null;
            }
            return result;
        }

        getAccumulatedPoints(): number {
            // TODO: calculate?
            return 0;
        }
    }
} 