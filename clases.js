var high = new Image();
high.src = "./highway.png";

class Coche {
  constructor() {
    this.x = window_width / 2.5;
    this.y = window_height - 100;
    this.speedX = 2;
    this.hits = 100;
  }
  draw(context) {
    context.fillStyle = "green";
    context.fillRect(this.x, this.y, 100, 100);
  }
  update() {
    this.draw(context);
  }
}

class Carretera {
  constructor() {
    this.x = window_width / 3.5;
    this.y = 0;
  }
  draw(context) {
    // var high = new Image();
    // high.src = "./highway.png";
    //context.drawImage(high, 600, window_height * 10);
    context.fillStyle = "gray";
    context.fillRect(this.x, this.y, 600, window_height * 10);
  }
  update() {
    this.draw(context);
  }
}

class Camion {
  constructor() {
    this.x = Math.random() * (1200 - 400) + 400;
    this.y = 5;
    this.speedY = 5;
  }

  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, 100, 150);
  }

  update() {
    this.draw(context);
    if (this.y > 1000) {
      this.y = 100;
      this.x = Math.random() * (1200 - 400) + 400;
    }
    this.y += this.speedY;
  }
}
