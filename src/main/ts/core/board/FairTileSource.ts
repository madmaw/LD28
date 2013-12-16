module ct.core.board {

    export class FairTileSource implements ITileSource {

        constructor(private fairRatio: number, private normalValues: IValue[], private symbolValues: IValue[][], private cruelty: number, private guaranteedSymbolValues?:IValue[]) {

        }

        create(quantity: number, rerand?: number): Tile[] {
            if (rerand == null) {
                rerand = 0;
            }
            var numberOfSymbols = Math.floor(quantity * this.fairRatio);
            return this.createQuantity(quantity - numberOfSymbols, numberOfSymbols, rerand, false);
        }

        createQuantity(numberOfValues: number, numberOfSymbols:number, rerand:number, avoidForced?:boolean): Tile[] {
            var result:Tile[] = [];
            for (var i = 0; i < numberOfValues; i++) {
                var r = Math.abs(this.rand(rerand) * 2 - 1);
                var index = Math.floor(r * this.normalValues.length);
                var value = this.normalValues[index];
                var tile = new Tile(value);
                result.push(tile);
            }
            if (this.guaranteedSymbolValues != null && !avoidForced) {
                for (var j in this.guaranteedSymbolValues) {
                    var value = this.guaranteedSymbolValues[j];
                    var tile = new Tile(value);
                    var pos = Math.floor(Math.random() * result.length);
                    result.splice(pos, 0, tile);
                }
            }
            for (var i = 0; i < numberOfSymbols; i++) {
                var r = Math.abs(this.rand(rerand) * 2 - 1);
                var index = Math.floor(r * this.symbolValues.length);
                var pos = Math.floor(Math.random() * result.length);
                var values = this.symbolValues[index];
                var valueIndex = Math.floor(Math.random() * values.length);
                var value = values[valueIndex];
                var tile = new Tile(value);
                result.splice(pos, 0, tile);
            }
            return result;
        }

        replace(board: Board, tiles: Tile[]): Tile[]{
            var tileCount = board.tilesAcross * board.tilesDown - tiles.length;
            var symbolTileCount = 0;
            var rerand = this.cruelty;
            // count the symbols
            /*
            for (var i in tiles) {
                var tile = tiles[i];
                if (!(tile.value instanceof ct.core.board.value.ValueNumeric)) {
                    symbolCount++;
                    rerand--;
                }
            }
            */
            for (var x = 0; x < board.tilesAcross; x++) {
                for (var y = 0; y < board.tilesDown; y++) {
                    var tile = board.tiles[x][y];
                    if (tiles.indexOf(tile) < 0 ) {
                        if (!(tile.value instanceof ct.core.board.value.ValueNumeric)) {
                            symbolTileCount++;
                        }
                    }
                }
            }
            var symbolProportion = symbolTileCount / tileCount;
            //var symbolCount = Math.round(r * (1 - symbolProportion) * 2 * this.fairRatio * tiles.length);
            var symbolCount = 0;
            for (var i = 0; i < tiles.length; i++) {
                var r = this.rand(this.cruelty);
                if (r * 2 * symbolProportion < this.fairRatio) {
                    symbolCount++;
                }
            }
            
            
            return this.createQuantity(Math.max(tiles.length - symbolCount, 0), symbolCount, Math.max(rerand, 0), true);
        }

        rand(rerand: number): number {
            var result = Math.random();
            for (var i = 0; i < rerand; i++) {
                result += Math.random();
            }
            return result/(rerand + 1);
        }

    }

}