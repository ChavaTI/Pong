// Objeto Board
(function() {

  self.Board = function(width, height) {
    this.width = width;
    this.height = height;
    this.playing = false;
    this.gameOver = false;
    this.bars = [];
    this.ball = null;
  }

  self.Board.prototype = {
    get elements() {
      var elements = this.bars.map(function(bar){return bar;});
      elements.push(this.ball);
      return elements;
    }


  };



})();


// Objeto BoardView
(function() {
  self.BoardView = function(canvas, board) {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext('2d');


  }

  self.BoardView.prototype = {
    clean: function(){
      this.ctx.clearRect(0,0,this.board.width,this.board.height);
    },


    draw: function() {
      //console.log(this.board.elements.length);
      // Por alguna extraña razón si uso el ciclo normal se cicla todo
      var limite = this.board.elements.length-1; // Esta variable se cicla
      for (var i = limite; i >= 0; i--) {
        var el = this.board.elements[i];
        draw2(this.ctx, el);
      }

    },

    play: function(){
      this.clean();
      this.draw();
      this.board.ball.move();
    }

  }


  function draw2(ctx, element) {
      switch (element.kind) {
        case 'rectangle':
          ctx.fillRect(element.x, element.y, element.width, element.height);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(element.x,element.y,element.radio,0,(Math.PI/180)*360,true);
          ctx.fill();
          ctx.closePath();
          break;


      }




  }


})();

//Objeto Barras.

(function() {
  self.Bar = function(x, y, width, height, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.board.bars.push(this);
    this.kind = 'rectangle';
    this.speed = 10;

  }

  self.Bar.prototype = {
    down: function() {
      this.y += this.speed;

    },

    up: function() {

      this.y -= this.speed;
    },
    toString: function(){
      return 'x: '+ this.x +'y: '+this.y;

    }


  }

})();

//Objeto Ball
(function() {
  self.Ball = function(x, y, radio, board) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.kind = 'circle'
    this.board = board;
    this.board.ball = this;
    this.speedX = 3;
    this.speedY = 0;
    this.direction = 1;

  }

  self.Ball.prototype = {
      move: function(){
        this.x += (this.speedX * this.direction);
        this.y += (this.speedY);

      }

  }


})();

//Variables

var board = new Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar2 = new Bar(750, 100, 40, 100, board);
var ball = new Ball(350, 100, 10, board);
var canvas = document.getElementById('canvas');
var view = new BoardView(canvas, board);

//Eventos


document.addEventListener('keydown',function(ev){
  ev.preventDefault(); //Para que no se mueva el scroll
  if (ev.keyCode == 38) {
    bar.up();
  }
  else if (ev.keyCode == 40) {
    bar.down();
  }

  else if (ev.keyCode == 87) {
    bar2.up();
  }
  else if (ev.keyCode == 83) {
    bar2.down();
  }



});

//window.addEventListener('keydown', controller); //No se necesita ya que usamos  requestAnimationFrame
window.requestAnimationFrame(controller);
// Funcion principal
function controller() {
  view.play();
  window.requestAnimationFrame(controller); // Se usa recursividad para animar constantemente
}
