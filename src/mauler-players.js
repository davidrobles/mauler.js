var Mauler = Mauler || {};

Mauler.Players = {};

var utilFunc = function(game, player) {
    var winValue = 1.0,
        lossValue = -1.0,
        drawValue = 0.0;
    if (game.isOver()) {
        var outcomes = game.outcomes();
        switch (outcomes[player]) {
            case "WIN":
                return winValue;
            case "LOSS":
                return lossValue;
            case "DRAW":
                return drawValue;
        }
    }
};

Mauler.Players.minimax = function(game) {
    var minmax = function(game, player, curDepth, maxDepth) {
        if (game.isOver() || curDepth === maxDepth) {
            return { move: -1, score: utilFunc(game, player) }
        }
        var bestMove = -1,
            bestScore = game.curPlayer() === player ? -Number.MAX_VALUE : Number.MAX_VALUE; // TODO change max and min values
        for (var move = 0; move < game.numMoves(); move++) { // TODO use 'n' variable
            var newGame = game.copy();
            newGame.move(move);
            var curMoveScore = minmax(newGame, player, curDepth + 1, maxDepth);
            if (game.curPlayer() === player) {
                if (curMoveScore.score > bestScore) {
                    bestMove = move;
                    bestScore = curMoveScore.score;
                }
            } else if (curMoveScore.score < bestScore) {
                bestMove = move;
                bestScore = curMoveScore.score;
            }
        }
        return { move: bestMove, score: bestScore };
    };
    return minmax(game.copy(), game.curPlayer(), 0, Number.MAX_VALUE).move;
};

Mauler.Players.negamax = function(game) {
    var negmax = function(game, curDepth, maxDepth) {
        if (game.isOver() || curDepth === maxDepth) {
            return { move: -1, score: utilFunc(game, game.curPlayer()) }
        }
        var bestMove = -1,
            bestScore = -Number.MAX_VALUE;
        for (var move = 0; move < game.numMoves(); move++) { // TODO use 'n' variable
            var newGame = game.copy();
            newGame.move(move);
            var curMoveScore = negmax(newGame, curDepth + 1, maxDepth);
            var curScore = -curMoveScore.score;
            if (curScore > bestScore) {
                bestMove = move;
                bestScore = curScore;
            }
        }
        return { move: bestMove, score: bestScore };
    };
    return negmax(game.copy(), 0, Number.MAX_VALUE).move;
};