var ct;
(function (ct) {
    window.onload = function () {
        var board = new ct.core.board.Board(4, 4);
        var gameState = new ct.core.board.BoardGameState(board);

        var boardGameStateRenderer = new ct.core.renderer.HandlebarsGameStateRenderer(toTemplate("test"));

        var el = document.getElementById('content');
        boardGameStateRenderer.render(gameState, el);
        /*
        var el = document.getElementById('content');
        var source = $('#test').html();
        var template = Handlebars.compile(source);
        var html = template({
        width: 100,
        height: 100,
        viewBoxWidth: 100,
        viewBoxHeight: 100
        });
        el.innerHTML = html;
        
        var rect = document.getElementById("box");
        var animSource = $("#test-anim").html();
        var animTemplate = Handlebars.compile(animSource);
        var animSVG = animTemplate({});
        var anim = parseSVG(animSVG);
        rect.appendChild(anim);
        
        $(rect).find(".test-anim").each(function () {
        var anim = this;
        this.addEventListener('beginEvent', function () {
        console.log("began!");
        });
        this.addEventListener('endEvent', function () {
        console.log("ended!");
        rect.removeChild(anim);
        });
        this.beginElement();
        
        });
        */
    };

    function toTemplate(id) {
        var templateString = document.getElementById(id).innerHTML;
        return Handlebars.compile(templateString);
    }

    function parseSVG(s) {
        var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
        var frag = document.createDocumentFragment();
        while (div.firstChild.firstChild)
            frag.appendChild(div.firstChild.firstChild);
        return frag;
    }
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        (function (board) {
            (function (action) {
                var ActionConsumeAndReplace = (function () {
                    function ActionConsumeAndReplace(toConsume, toReplaceWith, toReplaceAt) {
                        this.toConsume = toConsume;
                        this.toReplaceWith = toReplaceWith;
                        this.toReplaceAt = toReplaceAt;
                    }
                    ActionConsumeAndReplace.prototype.perform = function (gameState) {
                        // remove all the consumed tiles
                        var boardGameState = gameState;
                        var board = boardGameState.board;
                        for (var i in this.toConsume) {
                            var tile = this.toConsume[i];
                            var pos = tile.position;

                            // clear out that spot? - probably not actually neccessary
                            board.tiles[pos.x][pos.y] = null;
                        }
                        if (this.toReplaceWith) {
                            board.tiles[this.toReplaceAt.x][this.toReplaceAt.y] = this.toReplaceWith;
                        }
                        return gameState;
                    };
                    return ActionConsumeAndReplace;
                })();
                action.ActionConsumeAndReplace = ActionConsumeAndReplace;
            })(board.action || (board.action = {}));
            var action = board.action;
        })(core.board || (core.board = {}));
        var board = core.board;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        (function (board) {
            (function (action) {
                var ActionDrop = (function () {
                    function ActionDrop(tile, column, fromRow, toRow) {
                        this.tile = tile;
                        this.column = column;
                        this.fromRow = fromRow;
                        this.toRow = toRow;
                    }
                    ActionDrop.prototype.perform = function (gameState) {
                        // remove all the consumed tiles
                        var boardGameState = gameState;
                        var board = boardGameState.board;

                        if (this.fromRow >= 0) {
                            // remove from original row?
                            if (board.tiles[this.column][this.fromRow] == this.tile) {
                                board.tiles[this.column][this.fromRow] = null;
                            }

                            // add to new row
                            board.tiles[this.column][this.toRow] = this.tile;
                        }
                        return gameState;
                    };
                    return ActionDrop;
                })();
                action.ActionDrop = ActionDrop;
            })(board.action || (board.action = {}));
            var action = board.action;
        })(core.board || (core.board = {}));
        var board = core.board;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        (function (board) {
            var Board = (function () {
                function Board(width, height) {
                    this.width = width;
                    this.height = height;
                    this.tiles = new ct.core.board.Tile[width][height];
                }
                return Board;
            })();
            board.Board = Board;
        })(core.board || (core.board = {}));
        var board = core.board;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        (function (board) {
            var BoardGameState = (function () {
                function BoardGameState(board) {
                    this.board = board;
                    this.selectedChain = [];
                    this.points = 0;
                }
                return BoardGameState;
            })();
            board.BoardGameState = BoardGameState;
        })(core.board || (core.board = {}));
        var board = core.board;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        var Point = (function () {
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            return Point;
        })();
        core.Point = Point;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        (function (board) {
            var Tile = (function () {
                function Tile(value) {
                    this.value = value;
                }
                return Tile;
            })();
            board.Tile = Tile;
        })(core.board || (core.board = {}));
        var board = core.board;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        (function (board) {
            (function (value) {
                var ValueFunctionAddition = (function () {
                    function ValueFunctionAddition() {
                        this.numberOfResults = 1;
                        this.numberOfParams = 2;
                    }
                    ValueFunctionAddition.prototype.eval = function (board, params) {
                        var result = 0;
                        for (var i in params) {
                            var param = params[i];
                            result += param;
                        }

                        // TODO check for overflows
                        return result;
                    };

                    ValueFunctionAddition.prototype.toString = function () {
                        return "+";
                    };
                    return ValueFunctionAddition;
                })();
                value.ValueFunctionAddition = ValueFunctionAddition;
            })(board.value || (board.value = {}));
            var value = board.value;
        })(core.board || (core.board = {}));
        var board = core.board;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        (function (board) {
            (function (value) {
                var ValueNumeric = (function () {
                    function ValueNumeric(value) {
                        this.value = value;
                        this.numberOfResults = 1;
                        this.numberOfParams = 0;
                    }
                    ValueNumeric.prototype.eval = function (board, params) {
                        return this.value;
                    };

                    ValueNumeric.prototype.toString = function () {
                        return "" + this.value;
                    };
                    return ValueNumeric;
                })();
                value.ValueNumeric = ValueNumeric;
            })(board.value || (board.value = {}));
            var value = board.value;
        })(core.board || (core.board = {}));
        var board = core.board;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        (function (renderer) {
            (function (board) {
                var BoardGameStateRenderer = (function () {
                    function BoardGameStateRenderer() {
                    }
                    BoardGameStateRenderer.prototype.render = function (gameState, div) {
                        var boardGameState = gameState;
                        var board = boardGameState.board;
                        // render as template
                    };
                    return BoardGameStateRenderer;
                })();
                board.BoardGameStateRenderer = BoardGameStateRenderer;
            })(renderer.board || (renderer.board = {}));
            var board = renderer.board;
        })(core.renderer || (core.renderer = {}));
        var renderer = core.renderer;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
var ct;
(function (ct) {
    (function (core) {
        (function (renderer) {
            var HandlebarsGameStateRenderer = (function () {
                function HandlebarsGameStateRenderer(template) {
                    this.template = template;
                }
                HandlebarsGameStateRenderer.prototype.render = function (gameState, div) {
                    var html = this.template({ gameState: gameState });
                    div.innerHTML = html;
                };
                return HandlebarsGameStateRenderer;
            })();
            renderer.HandlebarsGameStateRenderer = HandlebarsGameStateRenderer;
        })(core.renderer || (core.renderer = {}));
        var renderer = core.renderer;
    })(ct.core || (ct.core = {}));
    var core = ct.core;
})(ct || (ct = {}));
//# sourceMappingURL=dist/maps/out.js.map
