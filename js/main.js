// Objeto Board
(function () {

  self.Board = function (width, height) {
    this.width = width;
    this.height = height;
    this.playing = false;
    this.gameOver = false;
    this.bars = [];
    this.ball = null;
  }

  self.Board.prototype = {
    get elements() {
      var elements = this.bars;
      elements.push(this.ball);
      return elements;
    }


  };



})();


// Objeto BoardView
(function () {
  self.BoardView = function (canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext('2d');


  }

  self.BoardView.prototype = {
    draw : function(){
      for (var i = 0; i < this.board.elements.length; i++) {
        var el = this.board.elements[i];

        draw2(this.ctx,el);
      }

    }

  }


      function draw2(ctx,element){
      if (element !== null && element.hasOwnProperty('kind')) {
        switch(element.kind){
          case 'rectangle':
          ctx.fillRect(element.x,element.y,element.width,element.height);
          break;


        }
      }



      }


})();

//Objeto Barras.

(function(){
  self.Bar = function(x,y,width,height,board){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;

    this.board.bars.push(this);

    this.kind = 'rectangle';

  }

  self.Bar.prototype = {
    down : function(){


    },

    up : function(){


    }


  }

})();


window.addEventListener('load', main);

// Funcion principal
function main() {

  var board = new Board(800, 400);
  var bar = new Bar(20,100,40,100,board);
  var canvas = document.getElementById('canvas');
  var view = new BoardView(canvas, board);

  view.draw();
}