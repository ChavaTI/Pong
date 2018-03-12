(function () {

  self.Board = function (width, height) {
    this.width = width;
    this.height = height;
    this.playing = false;
    this.gameOver = false;
  }

  self.Board.prototype = {
    get elements() {
      var elements = this.bars;
      elements.push(ball);
      return elements;
    }


  };


})();

(function () {
  self.BoardView = function (canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    ctx = canvas.getContext('2d');


  }


})();

window.addEventListener('load', main);

function main() {

  var board = new Board(800, 400);
  var canvas = document.getElementById('canvas');
  var view = new BoardView(canvas, board);
}
