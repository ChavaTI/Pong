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
      var elements = this.bars.map(function(bar) {
        return bar;
      });
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
    clean: function() {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    },


    draw: function() {
      //console.log(this.board.elements.length);
      // Por alguna extraña razón si uso el ciclo normal se cicla todo
      var limite = this.board.elements.length - 1; // Esta variable se cicla
      for (var i = limite; i >= 0; i--) {
        var el = this.board.elements[i];
        draw2(this.ctx, el);
      }

    },

    checkCollicions: function() {
      barsLenght = this.board.bars.length - 1;
      for (var i = barsLenght; i >= 0; i--) {
        var bar = this.board.bars[i];
        if (hit(bar, this.board.ball)) {
          this.board.ball.collision(bar);
        }
      }

    },

    play: function() {
      if (this.board.playing) {
        this.clean();
        this.draw();
        this.checkCollicions();
        this.board.ball.move();
      }
    }

  }

  function hit(a, b) {
    // Revisa si a coliciona con b
    var hit = false;
    // horizontales
    if (b.x + b.width >= a.x && b.x < a.x + a.width) {
      // verticales
      if (b.y + b.height >= b.y && b.y < a.y + a.height)
        hit = true;
    }
    //A contra B
    if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
      if (b.y <= a.y && b.y + b.height >= a.y + a.height)
        hit = true;
    }
    //B contra A
    if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
      if (a.y <= b.y && a.y + a.height >= b.y + b.height)
        hit = true;
    }
    return hit;

  }

  function draw2(ctx, element) {
    switch (element.kind) {
      case 'rectangle':
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radio, 0, (Math.PI / 180) * 360, true);
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
    toString: function() {
      return 'x: ' + this.x + 'y: ' + this.y;

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
    this.bounceAngle = 0;
    this.maxBounceAngle = Math.PI / 12;
    this.speed = 3;

  }

  self.Ball.prototype = {
    move: function() {
      this.x += (this.speedX * this.direction);
      this.y += (this.speedY);

    },
    get width() {
      return this.radio * 2;

    },
    get height() {
      return this.radio * 2;

    },

    collision: function(bar) {
      // Reacciona a una colicion a una barra que resive como parametro
      var relativeIntersectY = (bar.y + (bar.height / 2)) - this.y;
      var normalizedIntersectY = relativeIntersectY / (bar.height / 2);
      this.bounceAngle = normalizedIntersectY * this.maxBounceAngle;
      this.speedY = this.speed * -Math.sin(this.bounceAngle);
      this.speedX = this.speed * Math.cos(this.bounceAngle);

      if (this.x > (this.board.width / 2)) this.direction = -1;
      else this.direction = 1;
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


document.addEventListener('keydown', function(ev) {

  if (ev.keyCode == 38) {
    ev.preventDefault(); //Para que no se mueva el scroll
    bar.up();
  } else if (ev.keyCode == 40) {
    ev.preventDefault(); //Para que no se mueva el scroll
    bar.down();
  } else if (ev.keyCode == 87) {
    ev.preventDefault(); //Para que no se mueva el scroll
    bar2.up();
  } else if (ev.keyCode == 83) {
    ev.preventDefault(); //Para que no se mueva el scroll
    bar2.down();
  } else if (ev.keyCode == 32) {
    ev.preventDefault(); //Para que no se mueva el scroll
    board.playing = !board.playing;

  }



});

//window.addEventListener('keydown', controller); //No se necesita ya que usamos  requestAnimationFrame
window.requestAnimationFrame(controller);
// Funcion principal
view.draw(); // Para que dibuje por primera vez
function controller() {
  view.play();
  window.requestAnimationFrame(controller); // Se usa recursividad para animar constantemente
}
