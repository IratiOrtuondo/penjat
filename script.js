const palabras = ["JUEGO", "AHORCADO", "PROGRAMAR", "JAVASCRIPT"];
const palabra = palabras[Math.floor(Math.random() * palabras.length)];
const letrasCorrectas = new Set();
const letrasIncorrectas = new Set();
let intentos = 6;

const canvas = document.getElementById("ahorcado");
const ctx = canvas.getContext("2d");

const palabraMostrar = document.getElementById("palabra-mostrar");
const inputLetra = document.getElementById("input-letra");
const botonProbar = document.getElementById("probar-letra");
const resultado = document.getElementById("resultado");

function dibujarAhorcado(intentos) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;

  // Base
  if (intentos <= 5) {
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(250, 350);
    ctx.stroke();
  }
  // Poste
  if (intentos <= 4) {
    ctx.beginPath();
    ctx.moveTo(100, 350);
    ctx.lineTo(100, 50);
    ctx.stroke();
  }
  // Brazo
  if (intentos <= 3) {
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(200, 50);
    ctx.stroke();
  }
  // Cuerda
  if (intentos <= 2) {
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(200, 100);
    ctx.stroke();
  }
  // Cabeza
  if (intentos <= 1) {
    ctx.beginPath();
    ctx.arc(200, 130, 30, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Cuerpo
  if (intentos <= 0) {
    ctx.beginPath();
    ctx.moveTo(200, 160);
    ctx.lineTo(200, 260);
    ctx.stroke();
  }
}

function actualizarPalabraMostrar() {
  let texto = "";
  for (let letra of palabra) {
    if (letrasCorrectas.has(letra)) {
      texto += letra + " ";
    } else {
      texto += "_ ";
    }
  }
  palabraMostrar.textContent = texto.trim();
}

function verificarLetra() {
  const letra = inputLetra.value.toUpperCase();
  inputLetra.value = "";

  if (letrasCorrectas.has(letra) || letrasIncorrectas.has(letra)) {
    resultado.textContent = "¡Ya intentaste esa letra!";
    return;
  }

  if (palabra.includes(letra)) {
    letrasCorrectas.add(letra);
  } else {
    letrasIncorrectas.add(letra);
    intentos--;
    dibujarAhorcado(intentos);
  }

  actualizarPalabraMostrar();

  if ([...palabra].every((letra) => letrasCorrectas.has(letra))) {
    resultado.textContent = "¡Ganaste! 🎉";
    botonProbar.disabled = true;
  } else if (intentos === 0) {
    resultado.textContent = `¡Perdiste! La palabra era: ${palabra}`;
    botonProbar.disabled = true;
  }
}

botonProbar.addEventListener("click", verificarLetra);
actualizarPalabraMostrar();
dibujarAhorcado(intentos);
