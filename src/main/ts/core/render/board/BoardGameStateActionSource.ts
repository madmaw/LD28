module ct.core.render.board {

    export class BoardGameStateActionSource implements IActionSource {

        private actionHandler: (actions: IAction[]) => void;

        private mouseDown = false;
        private timerId: number;

        private touchStartListener: (e:any) => void;
        private touchMoveListener: (e: any) => void;
        private touchEndListener: (e: any) => void;

        constructor(
            private gameState: ct.core.board.BoardGameState,
            private homeGameState: ct.core.IGameState,
            private div: HTMLElement,
            private headerHeight: number,
            private extols: SoundEffect[], 
            private claim: SoundEffect,
            private invalid: SoundEffect
        ) {

        }

        countDown(startTime?:Date) {
            // timeout at the next interval
            var timeRemaining = this.gameState.millisecondsRemaining;
            if (timeRemaining != null) {
                // update visual stuff
                var timeoutGameState;
                if (timeRemaining <= 0) {
                    timeoutGameState = this.homeGameState;
                } else {
                    timeoutGameState = null;
                }
                this.actionHandler(
                    [
                        new ct.core.board.action.ActionTimeRemainingUpdated(this.gameState.secondsRemainingFormatted, this.gameState, null, startTime, timeoutGameState), 
                        // do it because certain kinds of scorers need it
                        new ct.core.board.action.ActionScoreUpdated()
                    ]
                );
                // attempt to sync that up with a 0
                this.timerId = setTimeout(() => { this.countDown() }, (timeRemaining % 100)+1);
            }
        }

        start(actionHandler: (actions: IAction[]) => void): void {
            this.actionHandler = actionHandler;

            var firstTap = true;

            var mouseDownHandler = (e: MouseEvent) => {
                var tile = this.getTile(e);
                if (tile) {
                    // select whereever is tapped
                    this.mouseDown = true;
                    console.log("mouse down!");

                    // TODO set selection state on all tiles
                    var states = this.calculateSelectionStates([tile.value]);
                    var action = new ct.core.board.action.ActionSelectTile(tile, states[0]);
                    actionHandler([action]);
                    // start counting down properly (if required)
                    if (firstTap) {
                        this.countDown(new Date());
                        firstTap = false;
                    }
                }
            };

            var mouseUpHandler = () => {
                if (this.mouseDown) {
                    this.mouseDown = false;
                    // if possible, execute the selected tile chain
                    var actions = this.actionTiles(this.gameState, this.gameState.selectedTileChain);
                    // clear the selected tile chain
                    for (var i in this.gameState.selectedTileChain) {
                        var tile = this.gameState.selectedTileChain[i];
                        var action = new ct.core.board.action.ActionDeselectTile(tile);
                        actions.push(action);
                    }
                    actionHandler(actions);
                }
            };

            var mouseMoveHandler = (e: MouseEvent) => {
                if (this.mouseDown) {
                    var tile = this.getTile(e);
                    if (tile) {
                        // is it already selected? remove everything back to that tile if it is
                        var index = this.gameState.selectedTileChain.indexOf(tile);
                        if (index >= 0) {
                            if (index < this.gameState.selectedTileChain.length - 1) {
                                // remove everything back until that point
                                var actions: ct.core.IAction[] = [];
                                for (var i = index + 1; i < this.gameState.selectedTileChain.length; i++) {
                                    var tile = this.gameState.selectedTileChain[i];
                                    var action: ct.core.IAction = new ct.core.board.action.ActionDeselectTile(tile);
                                    // TODO set selection state on remaining tiles
                                    actions.push(action);
                                }
                                // check the remainder
                                var tiles: ct.core.board.Tile[] = [];
                                for (var i = 0; i <= index; i++) {
                                    var selectedTile: ct.core.board.Tile = this.gameState.selectedTileChain[i];
                                    tiles.push(selectedTile);
                                }
                                var values = this.toValues(tiles);
                                var states = this.calculateSelectionStates(values);
                                for (var i = 0; i <= index; i++) {
                                    var selectedTile = tiles[i];
                                    var state = states[i];
                                    if (state != selectedTile.selectionState) {
                                        var setSelectionStateAction = new ct.core.board.action.ActionSetTileSelectionState(selectedTile, state);
                                        actions.push(setSelectionStateAction);
                                    }
                                }
                                actionHandler(actions);
                            }
                        } else {
                            // is it adjacent to the most recently selected tile (it must be to be added)
                            if (this.gameState.selectedTileChain.length > 0) {
                                var lastSelectedTile = this.gameState.selectedTileChain[this.gameState.selectedTileChain.length - 1];
                                if (
                                    lastSelectedTile != null &&
                                    (lastSelectedTile.position.x == tile.position.x && (lastSelectedTile.position.y == tile.position.y - 1 || lastSelectedTile.position.y == tile.position.y + 1) ||
                                    lastSelectedTile.position.y == tile.position.y && (lastSelectedTile.position.x == tile.position.x - 1 || lastSelectedTile.position.x == tile.position.x + 1))
                                    ) {
                                    // set selection state on all tiles
                                    var tiles: ct.core.board.Tile[] = [];
                                    for (var j in this.gameState.selectedTileChain) {
                                        var selectedTile: ct.core.board.Tile = this.gameState.selectedTileChain[j];
                                        tiles.push(selectedTile);
                                    }
                                    tiles.push(tile);
                                    var values = this.toValues(tiles);
                                    var states = this.calculateSelectionStates(values);
                                    var action: ct.core.IAction = new ct.core.board.action.ActionSelectTile(tile, states[states.length - 1]);
                                    var actions = [action];
                                    for (var i = 0; i < tiles.length - 1; i++) {
                                        var selectedTile = tiles[i];
                                        var state = states[i];
                                        if (state != selectedTile.selectionState) {
                                            var setSelectionStateAction = new ct.core.board.action.ActionSetTileSelectionState(selectedTile, state);
                                            actions.push(setSelectionStateAction);
                                        }
                                    }
                                    actionHandler(actions);
                                }
                            }
                        }
                    }
                }
            };

            // add in all the listeners
            this.div.onmousedown = mouseDownHandler;
            this.div.onmouseup = mouseUpHandler;
            this.div.onmousemove = mouseMoveHandler;

            this.touchStartListener = function (e: any) {
                mouseDownHandler(e.touches[0]);
                //window.alert("touch start " + e.touches[0]);
                e.preventDefault();
            };
            this.touchMoveListener = function (e: any) {
                mouseMoveHandler(e.touches[0]);
                e.preventDefault();
            };
            this.touchEndListener = function (e: any) {
                mouseUpHandler();
                e.preventDefault();
            };

            this.div.addEventListener('touchstart', this.touchStartListener); 
            this.div.addEventListener('touchmove', this.touchMoveListener); 
            this.div.addEventListener('touchend', this.touchEndListener); 
        }

        stop(): void {
            this.div.onmousedown = null;
            this.div.onmouseup = null;
            this.div.onmousemove = null;
            this.div.removeEventListener("touchstart", this.touchStartListener);
            this.div.removeEventListener("touchmove", this.touchMoveListener);
            this.div.removeEventListener("touchend", this.touchEndListener);
            if (this.timerId != null) {
                clearTimeout(this.timerId);
                this.timerId = null;
            }
        }


        private getTile(e: MouseEvent): ct.core.board.Tile {
            var result;
            var x = e.clientX;
            var y = e.clientY - this.headerHeight;
            var boardWidth = this.gameState.board.tileWidth * this.gameState.board.tilesAcross;
            var boardHeight = this.gameState.board.tileHeight * this.gameState.board.tilesDown;
            // are we on the board?
            if (x < boardWidth && y < boardHeight) {
                var tx = Math.floor(x / this.gameState.board.tileWidth);
                var ty = Math.floor(y / this.gameState.board.tileHeight);

                // is there a tile there?
                result = this.gameState.board.tiles[tx][ty];
            } else {
                result = null;
            }
            return result;

        }

        private calculateSelectionStates(values: ct.core.board.IValue[]): ct.core.board.TileSelectionState[]{
            var result = [];
            this.calculateSelectionStates2(values, result, false);
            for (var i in values) {
                result.push(ct.core.board.TileSelectionState.EXTRANEOUS);
            }
            return result;
        }

        private calculateSelectionStates2(values: ct.core.board.IValue[], states: ct.core.board.TileSelectionState[], isParameter:boolean): boolean {
            var result;
            if (values.length > 0) {
                var head = values.splice(0, 1);
                var value = head[0];
                var numberOfParams = value.numberOfParams;
                result = true;
                var stateIndex = states.length;
                for (var i = 0; i < numberOfParams; i++) {
                    result = this.calculateSelectionStates2(values, states, true) && result;
                }
                var state
                if (isParameter && !value.evalReturnsNumber) {
                    state = ct.core.board.TileSelectionState.BAD_PARAMETER;
                    result = false;
                } else if (result) {
                    state = ct.core.board.TileSelectionState.VALID;
                } else {
                    state = ct.core.board.TileSelectionState.INVALID;
                }
                states.splice(stateIndex, 0, state);
            } else {
                result = false;
            }
            return result;
        }

        private eval(values: ct.core.board.IValue[]): number {
            if (values.length > 0) {
                var head = values.splice(0, 1);
                var value = head[0];
                var numberOfParams = value.numberOfParams;
                var params = [];
                for (var i = 0; i < numberOfParams; i++) {
                    var param = this.eval(values);
                    // will remove the head
                    params.push(param);
                }
                return value.eval(params);
            } else {
                throw "too short!";
            }
        }

        private toValues(tiles: ct.core.board.Tile[]): ct.core.board.IValue[]{
            var values = [];
            for (var i in tiles) {
                var tile = tiles[i];
                values.push(tile.value);
            }
            return values;
        }

        private actionTiles(boardGameState:ct.core.board.BoardGameState, tiles: ct.core.board.Tile[]): IAction[]{

            var result = [];
            try {
                // check whether the sequence is valid
                var values = this.toValues(tiles);
                var value = this.eval(values);
                if (values.length > 0) {
                    throw "too long!";
                }

                // destroy 
                for (var i in tiles) {
                    var tile = tiles[i];
                    var action: IAction = new ct.core.board.action.ActionDestroyTile(tile);
                    result.push(action);
                }
                var newTiles = [];
                if (value != null) {
                    // add in a tile with the constant value
                    //newTile = new ct.core.board.Tile(new ct.core.board.value.ValueNumeric(value));
                    //var action: IAction = new ct.core.board.action.ActionCreateTile(newTile, tiles[0].position.x, tiles[0].position.y);
                    var valueActions = tiles[0].value.terminate(tiles, this.gameState, value);
                    for (var i in valueActions) {
                        var action = valueActions[i];
                        if (action instanceof ct.core.board.action.ActionCreateTile) {
                            var createTileAction = <ct.core.board.action.ActionCreateTile>action;
                            newTiles.push(createTileAction.tile);
                        }
                        result.push(action);
                    }
                }

                var dropInTiles: ct.core.board.Tile[];
                var dropInTileIndex = 0;
                if (boardGameState.replaceTiles) {
                    dropInTiles = boardGameState.tileSource.replace(boardGameState.board, tiles);
                }
                 
                // create valid sequence
                // drop tiles above
                for (var x = 0; x < this.gameState.board.tilesAcross; x++) {
                    var removed = 0;
                    for (var y = this.gameState.board.tilesDown; y > 0;) {
                        y--;
                        var tile = this.gameState.board.tiles[x][y];
                        if (tile != null) {

                            var index = tiles.indexOf(tile);
                            if (index >= 0) {
                                var newTileIndex = null;
                                // is there a new tile at this position?
                                for (var i in newTiles) {
                                    var newTile = newTiles[i];
                                    if (newTile.position.x == x && newTile.position.y == y) {
                                        newTileIndex = i;
                                        break;
                                    }
                                }
                                if (newTileIndex != null) {
                                    tile = newTiles[newTileIndex];
                                } else {
                                    removed++;
                                    tile = null;
                                }
                            }
                            if (tile != null && removed > 0) {
                                // TODO these should probably be dependent actions (dependent on the fade/destroy completion)
                                // we need to drop it down by the number of removed tiles
                                var action: IAction = new ct.core.board.action.ActionDropTile(tile, x, y, y + removed);
                                result.push(action);
                            }
                        }
                    }
                    if (boardGameState.replaceTiles) {
                        // add in the equivalent number of removed elements
                        for (var j = 0; j < removed; j++) {
                            var tile = dropInTiles[dropInTileIndex];
                            dropInTileIndex++;
                            var action: IAction = new ct.core.board.action.ActionDropTile(tile, x, j - removed, j);
                            result.push(action);
                        }
                    }
                }

                // finally calculate the new score
                result.push(new ct.core.board.action.ActionScoreUpdated());
                // TODO do not do this directly!
                var extolIndex = Math.min(this.extols.length - 1, Math.max(0, tiles.length - 3));
                var extol = this.extols[extolIndex];
                setTimeout(function () {
                    extol.play();
                }, Math.random() * 500);
                this.claim.play();

            } catch (e) {
                // you failed!
                // TODO have a failure action
                // TODO do not do this directly!
                this.invalid.play();
            }
            return result;
            
        }
    }

} 