let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.addEventListener("mousemove", (e) => {
  c1.x = e.clientX + 30;
  if (e.clientX < 300) c1.x = 300;
  else if (e.clientX > 1200) c1.x = 1200;
});

var background = new Image();
background.src = "./background.webp";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function () {
  context.drawImage(background, 0, 0);
};

let c1 = new Coche();
let camiones = [];

let carretera = new Carretera();

context.font = "48px serif";
context.strokeText("Hello world", 10, 50);

carretera.draw(context);

for (let i = 0; i < 3; i++) {
  camiones.push(new Camion());
}

for (let i = 0; i < 3; i++) {
  camiones[i].draw(context);
}

c1.draw(context);

function getDistance(camiones, cocheX, cocheY) {
  const distancias = [];
  camiones.forEach((cam) =>
    distancias.push(Math.sqrt(Math.pow(cam.x - cocheX, 2) + Math.pow(cam.y - cocheY, 2)))
  );
  //console.log(distancias);
  return distancias;
}

let update = () => {
  requestAnimationFrame(update);
  context.clearRect(0, 0, window_width, window_height);
  context.drawImage(background, 0, 0);
  carretera.update();
  context.font = "50px sans-serif";
  context.fillStyle = "#FFFFFF";
  context.fillText("Vida", 150, 300);
  context.fillText(`${c1.hits}`, 200, 360);

  camiones.forEach((camion) => camion.update());
  c1.update();

  if (getDistance(camiones, c1.x, c1.y).some((dist) => dist < 100)) {
    //console.log("entro");
    c1.hits -= 1;
  }
  // if (c1.hits <= 0) {
  //   context.fillText(`Has perdido`, 200, 360);
  // }
};

update();
