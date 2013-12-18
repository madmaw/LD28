module ct {

    window.onload = () => {

        Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
            if (arguments.length < 4) {
                // Operator omitted, assuming "+"
                options = rvalue;
                rvalue = operator;
                operator = "+";
            }

            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);

            console.log(options);

            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        });
        /*
        Handlebars.logger.log = function (s, x) {
            console.log(s + x);
        };
*/

        var dropTileSoundEffect = new ct.core.SoundEffect(["click-1", "click-2", "click-3", "click-4"]);
        var claimSoundEffect = new ct.core.SoundEffect(["whoosh-1", "whoosh-2", "whoosh-3"]);
        var extolSoundEffects = [
            new ct.core.SoundEffect([]),
            new ct.core.SoundEffect([]),
            new ct.core.SoundEffect(["extol-1", "", ""]),
            new ct.core.SoundEffect(["extol-2", "", ""]),
            new ct.core.SoundEffect(["extol-3", "", ""]),
            new ct.core.SoundEffect(["extol-3", ""]),
            new ct.core.SoundEffect(["extol-4", "", ""]),
            new ct.core.SoundEffect(["extol-4", ""]),
            new ct.core.SoundEffect(["extol-5", "", ""]),
            new ct.core.SoundEffect(["extol-5", ""]),
            new ct.core.SoundEffect(["extol-6", "", ""]),
            new ct.core.SoundEffect(["extol-5", ""])
        ];
        var invalidSoundEffect = new ct.core.SoundEffect(["invalid-1", "invalid-2"]);

        var columns = 6;
        var tileWidth = Math.floor((window.innerWidth) / columns);
        var tileHeight = Math.floor((window.innerHeight)/Math.floor(window.innerHeight / tileWidth));
        var rows = Math.floor((window.innerHeight) / tileHeight);
        if (rows < 5) {
            rows = 5;
            tileHeight = Math.floor(window.innerHeight / rows);
            columns = Math.floor(window.innerWidth / tileHeight);
            tileWidth = Math.floor(window.innerWidth / columns);
        }
        var headerHeight = tileHeight;
        rows--;


        var freePlayTileSource = new ct.core.board.FairTileSource(
            0.3,
            [new ct.core.board.value.ValueNumeric(1)],
            [
                [new ct.core.board.value.ValueFunctionAddition()]
            ],
            0
        );
        var youOnlyGetOneTileSource = new ct.core.board.FairTileSource(
            0.3,
            [new ct.core.board.value.ValueNumeric(1)],
            [
                [new ct.core.board.value.ValueFunctionAddition()]
            ], 
            0
        );
        var scantRewardsTileSource = new ct.core.board.FairTileSource(
            0.3,
            [new ct.core.board.value.ValueNumeric(0)],
            [
                [new ct.core.board.value.ValueFunctionIncrement(), new ct.core.board.value.ValueFunctionDecrement()],
                [new ct.core.board.value.ValueFunctionAddition(), new ct.core.board.value.ValueFunctionSubtraction()],
                [new ct.core.board.value.ValueFunctionMultiplication()],
            ],
            1
        );
        var accumulaterTileSource = new ct.core.board.FairTileSource(
            0.25,
            [new ct.core.board.value.ValueNumeric(0), new ct.core.board.value.ValueNumeric(1)],
            [
                [new ct.core.board.value.ValueFunctionAddition(), new ct.core.board.value.ValueFunctionSubtraction()],
                [new ct.core.board.value.ValueFunctionIncrement(), new ct.core.board.value.ValueFunctionDecrement()],
                [new ct.core.board.value.ValueFunctionMultiplication(), new ct.core.board.value.ValueFunctionAccumulate()],
            ],
            2,
            [new ct.core.board.value.ValueFunctionAccumulate()]
        );
        var timeTileSource = new ct.core.board.FairTileSource(
            0.25,
            [new ct.core.board.value.ValueNumeric(0), new ct.core.board.value.ValueNumeric(1)],
            [
                [new ct.core.board.value.ValueFunctionAddition(), new ct.core.board.value.ValueFunctionSubtraction()],
                [new ct.core.board.value.ValueFunctionIncrement(), new ct.core.board.value.ValueFunctionDecrement()],
                [new ct.core.board.value.ValueFunctionMultiplication(), new ct.core.board.value.ValueFunctionAddTime()],
            ],
            2, 
            [new ct.core.board.value.ValueFunctionAddTime()]
            );
        var zeroTileSource = new ct.core.board.FairTileSource(
            0.4,
            [new ct.core.board.value.ValueNumeric(-1), new ct.core.board.value.ValueNumeric(1)],
            [
                [new ct.core.board.value.ValueFunctionAddition(), new ct.core.board.value.ValueFunctionSubtraction()],
                [new ct.core.board.value.ValueFunctionIncrement(), new ct.core.board.value.ValueFunctionDecrement()],
            ],
            2,
            [new ct.core.board.value.ValueFunctionMultiplication()]
            );

        var boardValueScorer = new ct.core.board.PointsSourceBoardValue();
        var maxBoardValueScorer = new ct.core.board.PointsSourceMaxBoardValue();
        var accumulatedValueScorer = new ct.core.board.PointsSourceAccumulated();
        var timeScorer = new ct.core.board.PointSourceTime();
        var zeroScorer = new ct.core.board.PointSourceZero();

        var levels = [];
        levels.push(new ct.core.home.Level("f2p", "You Only Get One(s)", "Back button exits", false, (level) => {
            var index = 0;
            var board = new ct.core.board.Board(columns, rows, tileWidth, tileHeight);
            var tiles = freePlayTileSource.create(columns * rows, 1);
            var tileId = 0;
            var actions = [];
            for (var x = 0; x < board.tilesAcross; x++) {
                for (var y = 0; y < board.tilesDown; y++) {
                    var tile = tiles[index];
                    index++;
                    // set the board for handlebars (ugh!) - actually no longer required (ugh)
                    tile.board = board;
                    var tileDropAction = new ct.core.board.action.ActionDropTile(tile, x, y - board.tilesDown, y);
                    // drop them!
                    actions.push(tileDropAction);
                }
            }
            actions.push(new ct.core.board.action.ActionScoreUpdated());

            var gameState: ct.core.IGameState = new ct.core.board.BoardGameState(
                level,
                board,
                freePlayTileSource,
                boardValueScorer
            );
            return {
                gameState: gameState,
                actions: actions
            };
        }));
        levels.push(new ct.core.home.Level("scant", "Scant Rewards", "", true, (level) => {
            var index = 0;
            var board = new ct.core.board.Board(columns, rows, tileWidth, tileHeight);
            var tiles = scantRewardsTileSource.create(columns * rows, 10);
            var tileId = 0;
            var actions = [];
            for (var x = 0; x < board.tilesAcross; x++) {
                for (var y = 0; y < board.tilesDown; y++) {
                    var tile = tiles[index];
                    index++;
                    // set the board for handlebars (ugh!) - actually no longer required (ugh)
                    tile.board = board;
                    var tileDropAction = new ct.core.board.action.ActionDropTile(tile, x, y - board.tilesDown, y);
                    // drop them!
                    actions.push(tileDropAction);
                }
            }
            actions.push(new ct.core.board.action.ActionScoreUpdated());

            var gameState: ct.core.IGameState = new ct.core.board.BoardGameState(
                level,
                board,
                scantRewardsTileSource,
                boardValueScorer
            );
            return {
                gameState: gameState,
                actions: actions
            };
        }));
        levels.push(new ct.core.home.Level("acc", "Accumulater", "*(acc)umulate score", true, (level) => {
            var index = 0;
            var board = new ct.core.board.Board(columns, rows, tileWidth, tileHeight);
            var tiles = accumulaterTileSource.create(columns * rows, 1);
            var tileId = 0;
            var actions = [];
            for (var x = 0; x < board.tilesAcross; x++) {
                for (var y = 0; y < board.tilesDown; y++) {
                    var tile = tiles[index];
                    index++;
                    // set the board for handlebars (ugh!) - actually no longer required (ugh)
                    tile.board = board;
                    var tileDropAction = new ct.core.board.action.ActionDropTile(tile, x, y - board.tilesDown, y);
                    // drop them!
                    actions.push(tileDropAction);
                }
            }
            actions.push(new ct.core.board.action.ActionScoreUpdated());

            var gameState: ct.core.IGameState = new ct.core.board.BoardGameState(
                level,
                board,
                accumulaterTileSource,
                accumulatedValueScorer
                );
            return {
                gameState: gameState,
                actions: actions
            };
        }));
        levels.push(new ct.core.home.Level("timer", "Count Down", "first move starts timer", true, (level) => {
            var index = 0;
            var board = new ct.core.board.Board(columns, rows, tileWidth, tileHeight);
            var tiles = scantRewardsTileSource.create(columns * rows, 1);
            var tileId = 0;
            var actions = [];
            for (var x = board.tilesAcross; x > 0; ) {
                x--;
                for (var y = board.tilesDown; y > 0;) {
                    y--;
                    var tile = tiles[index];
                    index++;
                    // set the board for handlebars (ugh!) - actually no longer required (ugh)
                    tile.board = board;
                    var tileDropAction = new ct.core.board.action.ActionDropTile(tile, x, y - board.tilesDown, y);
                    // drop them!
                    actions.push(tileDropAction);
                }
            }
            actions.push(new ct.core.board.action.ActionScoreUpdated());

            var gameState: ct.core.IGameState = new ct.core.board.BoardGameState(
                level,
                board,
                scantRewardsTileSource,
                boardValueScorer,
                60 * 1000 * 2
                );
            return {
                gameState: gameState,
                actions: actions
            };
        }));

        levels.push(new ct.core.home.Level("tacc", "Timed Accumulater", "", true, (level) => {
            var index = 0;
            var board = new ct.core.board.Board(columns, rows, tileWidth, tileHeight);
            var tiles = accumulaterTileSource.create(columns * rows, 1);
            var tileId = 0;
            var actions = [];
            for (var x = 0; x < board.tilesAcross; x++) {
                for (var y = 0; y < board.tilesDown; y++) {
                    var tile = tiles[index];
                    index++;
                    // set the board for handlebars (ugh!) - actually no longer required (ugh)
                    tile.board = board;
                    var tileDropAction = new ct.core.board.action.ActionDropTile(tile, x, y - board.tilesDown, y);
                    // drop them!
                    actions.push(tileDropAction);
                }
            }
            actions.push(new ct.core.board.action.ActionScoreUpdated());

            var gameState: ct.core.IGameState = new ct.core.board.BoardGameState(
                level,
                board,
                accumulaterTileSource,
                accumulatedValueScorer,
                60 * 1000 * 2
                );
            return {
                gameState: gameState,
                actions: actions
            };
        }));
        levels.push(new ct.core.home.Level("alive", "Stayin' Alive", "time is score", true, (level) => {
            var index = 0;
            var board = new ct.core.board.Board(columns, rows, tileWidth, tileHeight);
            var tiles = timeTileSource.create(columns * rows, 1);
            var tileId = 0;
            var actions = [];
            for (var x = 0; x < board.tilesAcross; x++) {
                for (var y = 0; y < board.tilesDown; y++) {
                    var tile = tiles[index];
                    index++;
                    // set the board for handlebars (ugh!) - actually no longer required (ugh)
                    tile.board = board;
                    var tileDropAction = new ct.core.board.action.ActionDropTile(tile, x, y - board.tilesDown, y);
                    // drop them!
                    actions.push(tileDropAction);
                }
            }
            actions.push(new ct.core.board.action.ActionScoreUpdated());

            var gameState: ct.core.IGameState = new ct.core.board.BoardGameState(
                level,
                board,
                timeTileSource,
                timeScorer,
                60 * 1000 * 2
                );
            return {
                gameState: gameState,
                actions: actions
            };
        }));
        levels.push(new ct.core.home.Level("zero", "Zero out", "make zero value", true, (level) => {
            var index = 0;
            var board = new ct.core.board.Board(columns, rows, tileWidth, tileHeight);
            var tiles = zeroTileSource.create(columns * rows, 1);
            var tileId = 0;
            var actions = [];
            for (var x = 0; x < board.tilesAcross; x++) {
                for (var y = 0; y < board.tilesDown; y++) {
                    var tile = tiles[index];
                    index++;
                    // set the board for handlebars (ugh!) - actually no longer required (ugh)
                    tile.board = board;
                    var tileDropAction = new ct.core.board.action.ActionDropTile(tile, x, y - board.tilesDown, y);
                    // drop them!
                    actions.push(tileDropAction);
                }
            }
            actions.push(new ct.core.board.action.ActionScoreUpdated());

            var gameState = new ct.core.board.BoardGameState(
                level,
                board,
                zeroTileSource,
                zeroScorer
                );
            gameState.replaceTiles = false;
            return {
                gameState: <ct.core.IGameState>gameState,
                actions: actions
            };
        }));

        var homeGameState = new ct.core.home.HomeGameState(levels);
        var boardGameStateRenderer = new ct.core.render.board.BoardGameStateRenderer(
            toTemplate("board"),
            {
                headerHeight: headerHeight,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            },
            window.location.pathname,
            headerHeight, 
            homeGameState, 
            extolSoundEffects,
            claimSoundEffect,
            invalidSoundEffect
        );
        var homeGameStateRenderer = new ct.core.render.home.HomeGameStateRenderer(
            toTemplate("home"),
            {},
            window.location.pathname,
            window.innerWidth,
            window.innerHeight
        );


        var tileTemplate = toTemplate("tile");
        Handlebars.registerPartial("tile", tileTemplate);
        var actionDropTemplate = toTemplate("animate-action-drop");
        var attributeAnimationTemplate = toTemplate("animate-attribute");
        var tileClaimTemplate = toTemplate("animate-grow");
        var actionSource: ct.core.render.IActionSource = null;

        var eatGameState = function (gameState: ct.core.IGameState, actions: ct.core.IAction[]) {
            var stateRenderer: ct.core.render.IGameStateRenderer = null;
            // very crude factory
            if (gameState instanceof ct.core.board.BoardGameState) {
                stateRenderer = boardGameStateRenderer;
            } else {
                stateRenderer = homeGameStateRenderer;
            }
            var el = document.getElementById('content');
            if (actionSource != null) {
                // close it down
                actionSource.stop();
            }
            actionSource = stateRenderer.render(gameState, el);

            // render and execute these actions
            var rendererFactory = new ct.core.render.HardcodedActionRendererFactory(
                "#DDDDDD",
                "#BBFFBB",
                "#FFBBBB",
                "#BBBBFF",
                "#888888",
                tileTemplate,
                attributeAnimationTemplate,
                tileClaimTemplate,
                actionDropTemplate,
                dropTileSoundEffect
                );
            for (var i in actions) {
                // note: we don't wait for the animations to finish before updating the game state
                // game state should be the same!
                var action = actions[i];
                action.perform(gameState);
                var renderer = rendererFactory.getActionRenderer(action);
                renderer.render(action, gameState, el, true);
            }

            actionSource.start(function (actions: ct.core.IAction[]) {
                var switchedGameState = false;
                for (var i in actions) {
                    var action = actions[i];
                    var actionsAndGameState = action.perform(gameState);
                    var completionListener;
                    if (actionsAndGameState != null) {
                        var newGameState = actionsAndGameState.gameState;
                        var newActions = actionsAndGameState.actions;

                        if (newGameState != gameState && newGameState != null) {
                            if (!switchedGameState) {
                                completionListener = () => {
                                    eatGameState(newGameState, newActions);
                                };
                                switchedGameState = true;

                            }
                        } else {
                            // add in the actions
                            for (var j in newActions) {
                                var newAction = newActions[j];
                                actions.push(newAction);
                            }
                        }
                    }

                    var renderer = rendererFactory.getActionRenderer(action);
                    // switch at the end of the transition(s)
                    if (renderer != null) {
                        renderer.render(action, gameState, el, true, completionListener);
                    } else {
                        if (completionListener != null) {
                            completionListener();
                        }
                    }

                }
            });
        };

        var loadState = function (state?: string) {
            if (state != null && state.length > 0 && state.charAt(0) == "#") {
                state = state.substring(1);
            }

            var gameState;
            var actions;
            var selectedLevel:ct.core.home.Level = null;
            for (var i in levels) {
                var level = levels[i];
                if (level.id == state) {
                    selectedLevel = level;
                    break;
                }
            }
            if (selectedLevel != null) {
                var a = selectedLevel.gameStateFactory(selectedLevel);
                gameState = a.gameState;
                actions = a.actions;
            } else {
                gameState = homeGameState;
                actions = [];
            }

            eatGameState(gameState, actions);

        };

        window.onhashchange = () => {
            // load up the state
            var hash = window.location.hash;
            loadState(hash);
        };

        loadState(window.location.hash);

       
        
    };

    function toTemplate(id): (context: any, options?: any) => string {
        var templateString = document.getElementById(id).innerHTML;
        return Handlebars.compile(templateString);
    }



}