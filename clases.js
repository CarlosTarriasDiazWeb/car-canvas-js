//Representa el jugador. Sólo se puede mover en la dirección X en los límites marcados.
class Coche {
  constructor() {
    this.x = window_width / 2.5;
    this.y = window_height - 100;
    this.speedX = 2;
    this.hits = 100;
    this.img = new Image();
    this.img.src = "./player.png";
  }
  draw(context) {
    // context.fillStyle = "green";
    // context.fillRect(this.x, this.y, 50, 60);
    context.drawImage(this.img, this.x, this.y, 50, 60);
  }
  update() {
    this.draw(context);
  }
}

//Representa la carretera de fondo. Se va desplazando para crear la ilusión de movimiento del jugador.
class Carretera {
  constructor() {
    this.x = 500;
    this.y = 0;
    this.alto = window_height;
    this.img = new Image();
    this.img.src = "./highway.png";
    this.speedY = 5;
  }
  draw(context) {
    context.drawImage(this.img, 500, this.y - this.alto, this.x, this.alto * 3);
    // context.fillStyle = "gray";
    // context.fillRect(this.x, this.y, 700, window_height * 10);
  }
  update() {
    this.draw(context);
    this.y = (this.y + this.speedY) % (50 + this.alto);
  }
}

//Representa un objeto camión con el que puede chocar el jugador. Si se choca con alguno vamos perdiendo vidas.
class Camion {
  constructor() {
    this.x = Math.random() * (950 - 600) + 600;
    this.y = 2;
    this.speedY = 8;
    this.img = new Image();
    this.img.src = "./truck.jpg";
  }

  draw(context) {
    // context.fillStyle = "red";
    // context.fillRect(this.x, this.y, 100, 150);
    context.drawImage(this.img, 40, 30, 140, 150, this.x, this.y, 80, 120);
  }

  update() {
    this.draw(context);
    if (this.y > 1000) {
      this.y = 3;
      this.x = Math.random() * (950 - 600) + 600;
    }
    this.y += this.speedY;
  }
}

//Representa un objeto moneda con el que puede chocar el jugador. Si se toca la moneda ganamos puntos de vida.
class Moneda {
  constructor() {
    this.x = Math.random() * (950 - 600) + 600;
    this.y = -10;
    this.speedY = 10;
    this.speedX = 4;
    this.img = new Image();
    this.img.src = "./coin.jpg";
  }

  draw(context) {
    context.drawImage(this.img, 40, 40, 120, 100, this.x, this.y, 50, 50);
  }

  update() {
    this.draw(context);
    if (this.y > 1000) {
      this.y = -10;
      this.x = Math.random() * (950 - 600) + 600;
    }
    this.y += this.speedY;
    this.x += Math.random() * (5 + 5) - 5;
  }
}
