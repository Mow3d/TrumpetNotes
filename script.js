document.addEventListener('DOMContentLoaded', () => {
    const notas = [
        { nombre: 'A#3', imagen: 'Notas/A#3.png', sonido: 'sonidos/A#3.wav' },
        { nombre: 'A#4', imagen: 'Notas/A#4.png', sonido: 'sonidos/A#4.wav' },
        { nombre: 'A#5', imagen: 'Notas/A#5.png', sonido: 'sonidos/A#5.wav' },
        { nombre: 'A3', imagen: 'Notas/A3.png', sonido: 'sonidos/A3.wav' },
        { nombre: 'A4', imagen: 'Notas/A4.png', sonido: 'sonidos/A4.wav' },
        { nombre: 'A5', imagen: 'Notas/A5.png', sonido: 'sonidos/A5.wav' },
        { nombre: 'B3', imagen: 'Notas/B3.png', sonido: 'sonidos/B3.wav' },
        { nombre: 'B4', imagen: 'Notas/B4.png', sonido: 'sonidos/B4.wav' },
        { nombre: 'B5', imagen: 'Notas/B5.png', sonido: 'sonidos/B5.wav' },
        { nombre: 'C#4', imagen: 'Notas/C#4.png', sonido: 'sonidos/C#4.wav' },
        { nombre: 'C#5', imagen: 'Notas/C#5.png', sonido: 'sonidos/C#5.wav' },
        { nombre: 'C4', imagen: 'Notas/C4.png', sonido: 'sonidos/C4.wav' },
        { nombre: 'C5', imagen: 'Notas/C5.png', sonido: 'sonidos/C5.wav' },
        { nombre: 'C6', imagen: 'Notas/C6.png', sonido: 'sonidos/C6.wav' },
        { nombre: 'D#4', imagen: 'Notas/D#4.png', sonido: 'sonidos/D#4.wav' },
        { nombre: 'D#5', imagen: 'Notas/D#5.png', sonido: 'sonidos/D#5.wav' },
        { nombre: 'D4', imagen: 'Notas/D4.png', sonido: 'sonidos/D4.wav' },
        { nombre: 'D5', imagen: 'Notas/D5.png', sonido: 'sonidos/D5.wav' },
        { nombre: 'E4', imagen: 'Notas/E4.png', sonido: 'sonidos/E4.wav' },
        { nombre: 'E5', imagen: 'Notas/E5.png', sonido: 'sonidos/E5.wav' },
        { nombre: 'F#3', imagen: 'Notas/F#3.png', sonido: 'sonidos/F#3.wav' },
        { nombre: 'F#4', imagen: 'Notas/F#4.png', sonido: 'sonidos/F#4.wav' },
        { nombre: 'F#5', imagen: 'Notas/F#5.png', sonido: 'sonidos/F#5.wav' },
        { nombre: 'F4', imagen: 'Notas/F4.png', sonido: 'sonidos/F4.wav' },
        { nombre: 'F5', imagen: 'Notas/F5.png', sonido: 'sonidos/F5.wav' },
        { nombre: 'G#3', imagen: 'Notas/G#3.png', sonido: 'sonidos/G#3.wav' },
        { nombre: 'G#4', imagen: 'Notas/G#4.png', sonido: 'sonidos/G#4.wav' },
        { nombre: 'G#5', imagen: 'Notas/G#5.png', sonido: 'sonidos/G#5.wav' },
        { nombre: 'G3', imagen: 'Notas/G3.png', sonido: 'sonidos/G3.wav' },
        { nombre: 'G4', imagen: 'Notas/G4.png', sonido: 'sonidos/G4.wav' },
        { nombre: 'G5', imagen: 'Notas/G5.png', sonido: 'sonidos/G5.wav' }
    ];

    let notaActual = null;
    let modoJuego = null;

    // Elementos del DOM
    const modeSelection = document.getElementById('modeSelection');
    const gameContainer = document.getElementById('gameContainer');
    const practiceContainer = document.getElementById('practiceContainer');

    const practiceModeBtn = document.getElementById('practiceModeBtn');
    const soundModeBtn = document.getElementById('soundModeBtn');
    const staffModeBtn = document.getElementById('staffModeBtn');
    const fingeringModeBtn = document.getElementById('fingeringModeBtn');

    const questionContainer = document.getElementById('questionContainer');
    const optionsContainer = document.getElementById('optionsContainer');
    const resultContainer = document.getElementById('resultContainer');
    const nextNoteBtn = document.getElementById('nextNoteBtn');

    const generateButton = document.getElementById('generateButton');
    const imageContainer = document.getElementById('imageContainer');

    // --- Lógica de Inicialización ---
    function inicializar() {
        gameContainer.classList.add('hidden');
        practiceContainer.classList.add('hidden');
        modeSelection.classList.remove('hidden');
    }

    // --- Lógica del Modo Práctica ---
    generateButton.addEventListener('click', mostrarNotaAleatoria);

    function mostrarNotaAleatoria() {
        const notaAleatoria = notas[Math.floor(Math.random() * notas.length)];
        imageContainer.innerHTML = `<img src="${encodeURI(notaAleatoria.imagen)}" alt="${notaAleatoria.nombre}">`;
        const audio = new Audio(encodeURI(notaAleatoria.sonido));
        audio.play();
    }

    // --- Lógica de Selección de Modo ---
    practiceModeBtn.addEventListener('click', () => iniciarModo('practica'));
    soundModeBtn.addEventListener('click', () => iniciarModo('sonido'));
    staffModeBtn.addEventListener('click', () => iniciarModo('pentagrama'));
    fingeringModeBtn.addEventListener('click', () => iniciarModo('digitacion'));

    function iniciarModo(modo) {
        modoJuego = modo;
        modeSelection.classList.add('hidden');

        if (modo === 'practica') {
            practiceContainer.classList.remove('hidden');
            gameContainer.classList.add('hidden');
            mostrarNotaAleatoria(); // Mostrar una nota al entrar en modo práctica
        } else {
            practiceContainer.classList.add('hidden');
            gameContainer.classList.remove('hidden');
            iniciarJuego();
        }
    }

    // --- Lógica del Juego ---
    nextNoteBtn.addEventListener('click', iniciarJuego);

    function iniciarJuego() {
        resultContainer.textContent = '';
        nextNoteBtn.classList.add('hidden');
        optionsContainer.innerHTML = ''; // Limpiar opciones anteriores

        // 1. Seleccionar una nota correcta al azar
        notaActual = notas[Math.floor(Math.random() * notas.length)];

        // 2. Presentar la pregunta según el modo
        questionContainer.innerHTML = '';
        if (modoJuego === 'sonido') {
            const playSoundBtn = document.createElement('button');
            playSoundBtn.textContent = 'Reproducir Sonido';
            playSoundBtn.addEventListener('click', () => {
                const audio = new Audio(encodeURI(notaActual.sonido));
                audio.play();
            });
            questionContainer.appendChild(playSoundBtn);
        } else { // Para 'pentagrama' y 'digitacion'
            const img = document.createElement('img');
            img.src = encodeURI(notaActual.imagen);
            img.alt = 'Nota a adivinar';
            questionContainer.appendChild(img);
        }

        // 3. Generar opciones de respuesta
        generarOpciones();
    }

    function generarOpciones() {
        const opciones = [notaActual.nombre];
        while (opciones.length < 4) {
            const notaAleatoria = notas[Math.floor(Math.random() * notas.length)].nombre;
            if (!opciones.includes(notaAleatoria)) {
                opciones.push(notaAleatoria);
            }
        }

        // Mezclar las opciones
        opciones.sort(() => Math.random() - 0.5);

        opciones.forEach(opcion => {
            const btn = document.createElement('button');
            btn.textContent = opcion;
            btn.addEventListener('click', () => verificarRespuesta(opcion));
            optionsContainer.appendChild(btn);
        });
    }

    function verificarRespuesta(seleccion) {
        // Deshabilitar botones para evitar múltiples respuestas
        const botones = optionsContainer.querySelectorAll('button');
        botones.forEach(btn => btn.disabled = true);

        if (seleccion === notaActual.nombre) {
            resultContainer.textContent = '¡Correcto!';
            resultContainer.style.color = 'green';
        } else {
            resultContainer.textContent = `Incorrecto. La nota era ${notaActual.nombre}`;
            resultContainer.style.color = 'red';
        }
        nextNoteBtn.classList.remove('hidden');
    }

    // --- Inicialización ---
    inicializar();
});