Mauler
======

Mauler is a JavaScript framework for abstract strategy games.

Installation
------------

```bash
$ npm install mauler
```

Games
-----

- [Tic-Tac-Toe](http://github.com/davidrobles/mauler/blob/master/src/games/tic-tac-toe.js)

Algorithms
----------

- [Random](http://github.com/davidrobles/mauler/blob/master/src/players/random.js)
- [Minimax](http://github.com/davidrobles/mauler/blob/master/src/players/minimax.js)
- [Negamax](http://github.com/davidrobles/mauler/blob/master/src/players/negamax.js)
- [Alpha-beta pruning](http://github.com/davidrobles/mauler/blob/master/src/players/alpha-beta.js)
- [Monte Carlo](http://github.com/davidrobles/mauler/blob/master/src/players/monte-carlo.js)
- [Monte Carlo Tree Search](http://github.com/davidrobles/mauler/blob/master/src/players/mcts.js)

Play a Random Game
------------------

```js
var game = new ma.games.TicTacToe();
console.log(game.toString());
while (!game.isGameOver() {
  var moves = game.moves();
  var randomMove = moves[Math.floor(Math.random() * moves.length)];
  game.move(randomMove);
  console.log(game.toString());
}
```

Play a Game Between Two Players
-------------------------------

```js
var game = new ma.games.TicTacToe();
var players = [new ma.players.random(), new ma.players.alphaBeta()]
console.log(game.toString());
while (!game.isGameOver() {
  var player = players[game.currentPlayer()];
  var move = player(game);
  game.move(randomMove);
  console.log(game.toString());
}
```
