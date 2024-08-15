


let palabras = ["hola mundo", "Vamos que vos podes", "persevera y triunfarás"];
let index = 0;
let parrafoPalabra = document.createElement('h3');
parrafoPalabra.classList.add('palabron');
let contenedor = document.getElementById('contenedor'); 
let audio = document.getElementById('audio');
let startButton = document.getElementById('startButton');

// Agrega el elemento h3 al contenedor
contenedor.append(parrafoPalabra);

// Define la función que se llamará al hacer clic en el botón
function iniciarEfecto() {
    efectoEscritura(); 
    // Elimina el eventListener después de la primera ejecución
    startButton.removeEventListener('click', iniciarEfecto);
}

function efectoEscritura() {
    // Reproduce el audio justo cuando comienza el efecto de escritura
    playAudio();

    let i = 0;
    let parrafoIndexado = palabras[index];
    parrafoPalabra.textContent = '';

    let interval = setInterval(() => {
        parrafoPalabra.textContent += parrafoIndexado[i];
        i++;

        if (i === parrafoIndexado.length) { 
            clearInterval(interval);
            setTimeout(efectoRetroceso, 1000);
        }
    }, 500);
}

function efectoRetroceso() {
    let palabrasIndexadas = palabras[index];
    let j = palabrasIndexadas.length;

    let intervale = setInterval(() => {
        parrafoPalabra.textContent = palabrasIndexadas.slice(0, j);
        j--;

        if (j < 0) {
            clearInterval(intervale);
            index = (index + 1) % palabras.length;
            setTimeout(efectoEscritura, 1000);
        }
    }, 500);
}

function playAudio() {
    // Verifica si el audio está disponible y lo reproduce
    audio.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
    });
}

// Maneja el error de carga del audio
audio.addEventListener('error', function() {
    console.error('No se pudo cargar el archivo de audio.');
});

// Agrega el eventListener al botón
startButton.addEventListener('click', iniciarEfecto);
