// >>>>>> FUNCIONES AUXILIARES

//Para añadir camiones al canvas
const anyadirCamion = () => {
  if (camiones.length < 5) camiones.push(new Camion());
};

//Para hacer aparacer/desaparecer la moneda.
const toggleMoneda = () => (moneda != null ? (moneda = null) : (moneda = new Moneda()));

const dibujarUI = () => {
  context.font = "50px sans-serif";
  context.fillStyle = "#FFFFFF";
  context.fillText("Vida", 150, 300);
  context.fillText(`${c1.hits}`, 180, 360);
  context.fillText("Puntos", 1200, 300);
  context.fillText(`${c1.points}`, 1250, 360);
};

//Para calcular la distancia entre el coche y todos los camiones en pantalla.
function getDistance(camiones, cocheX, cocheY) {
  const distancias = [];
  camiones.forEach((cam) =>
    distancias.push(Math.sqrt(Math.pow(cam.x - cocheX, 2) + Math.pow(cam.y - cocheY, 2)))
  );
  //console.log(distancias);
  return distancias;
}

//Para comprobar si ha habido colisión con una moneda.
function coinCollision(cocheX, cocheY, moneda) {
  return Math.sqrt(Math.pow(moneda?.x - cocheX, 2) + Math.pow(moneda?.y - cocheY, 2)) < 20;
}

//Para guardar puntuación en almacenamiento local.
const guardarUltimaPuntuacion = () => {
  let v = JSON.parse(localStorage.getItem("score"));
  if (localStorage.getItem("score") === null) {
    localStorage.setItem("score", JSON.stringify([c1.points]));
  } else {
    v.push(c1.points);
    localStorage.setItem("score", JSON.stringify(v));
  }
};

//Para mostrar historial de puntuaciones.
const mostrarPuntuaciones = () => {
  document.body.innerHTML = "<ul>";
  JSON.parse(localStorage?.getItem("score")).forEach((score, index) => {
    document.body.innerHTML += `<li>Partida ${index + 1} : ${score}</li>`;
  });
  document.body.innerHTML += "</ul>";
};
