// Creamos canvas para gráficos 2D
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

//Establecemos que el tamaño del canvas sea toda la pantalla.
var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

//Creamos los objetos que intervienen en el juego.
let c1 = new Coche();
let camiones = [];
let carretera = new Carretera();
let moneda = new Moneda();

//Establecesmos y dibujamos imagen pixel-art de fondo
var background = new Image();
background.src = "./background.webp";

//Hay que asegurarse que la imagen se cargue primero si no, no se pinta nada.
background.onload = function () {
  context.drawImage(background, 0, 0);
};

//Para calcular la distancia entre
function getDistance(camiones, cocheX, cocheY) {
  const distancias = [];
  camiones.forEach((cam) =>
    distancias.push(Math.sqrt(Math.pow(cam.x - cocheX, 2) + Math.pow(cam.y - cocheY, 2)))
  );
  //console.log(distancias);
  return distancias;
}

//Para que el control del coche dependa de la posición del mouse en cada momento.
canvas.addEventListener("mousemove", (e) => {
  c1.x = e.clientX + 30;
  if (e.clientX < 500) c1.x = 500;
  else if (e.clientX > 950) c1.x = 950;
});

//Evento para que el canvas no se recorte al modificar tamaño de la ventana.
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//Para pintar los objetos del juego.
let draw = () => {
  //Pintamos etiqueta de texto que muestra la vida restante.
  context.font = "48px serif";
  context.strokeText("Hello world", 10, 50);

  //Pintamos carretera.
  carretera.draw(context);

  //Pintamos los camiones en posiciones aleatorias.
  for (let i = 0; i < 3; i++) {
    camiones.push(new Camion());
  }

  for (let i = 0; i < 3; i++) {
    camiones[i].draw(context);
  }
  moneda.draw(context);

  //Pintamos el coche.
  c1.draw(context);
};

//Para volver a dibujar los objetos (y hacer las comprobaciones necesarias) del juego cada nuevo frame.
let update = () => {
  context.clearRect(0, 0, window_width, window_height); //Para limpiar el canvas cada frame.
  context.drawImage(background, 0, 0);
  carretera.update();

  context.font = "50px sans-serif";
  context.fillStyle = "#FFFFFF";
  context.fillText("Vida", 150, 300);
  context.fillText(`${c1.hits}`, 200, 360);
  //Generamos moneda con un 20% de prob.
  //moneda.update();

  camiones.forEach((camion) => camion.update());
  moneda.update();
  c1.update();

  //Si hay alguna colisión entre el coche y un camión restamos puntos de vida.
  if (getDistance(camiones, c1.x, c1.y).some((dist) => dist < 70)) {
    c1.hits -= 1;
    if (c1.hits <= 0) {
      document.body?.removeChild(canvas);
    }
  }

  //Generamos siguiente frame
  requestAnimationFrame(update);
};

draw();
update();
