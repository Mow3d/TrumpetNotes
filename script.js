document.addEventListener('DOMContentLoaded', () => {
    const notas = [
        { nombre: 'Do4', imagen: 'Notas/Do4.png', sonido: 'sonidos/Do4.mp3' },
        { nombre: 'Re', imagen: 'Notas/Re.png', sonido: 'sonidos/Re.mp3' },
        { nombre: 'Mi', imagen: 'Notas/Mi.png', sonido: 'sonidos/Mi.mp3' },
        { nombre: 'Fa', imagen: 'Notas/Fa.png', sonido: 'sonidos/Fa.mp3' },
        { nombre: 'Sol', imagen: 'Notas/Sol.png', sonido: 'sonidos/Sol.mp3' },
        { nombre: 'La', imagen: 'Notas/La.png', sonido: 'sonidos/La.mp3' },
        { nombre: 'Si', imagen: 'Notas/Si.png', sonido: 'sonidos/Si.mp3' },
        { nombre: 'Do5', imagen: 'Notas/Do5.png', sonido: 'sonidos/Do5.mp3' },
        { nombre: 'DoSostenido', imagen: 'Notas/DoSostenido.png', sonido: 'sonidos/DoSostenido.mp3' },
        { nombre: 'FaSostenido', imagen: 'Notas/FaSostenido.png', sonido: 'sonidos/FaSostenido.mp3' },
        { nombre: 'LaSostenido', imagen: 'Notas/LaSostenido.png', sonido: 'sonidos/LaSostenido.mp3' },
        { nombre: 'ReSostenido', imagen: 'Notas/ReSostenido.png', sonido: 'sonidos/ReSostenido.mp3' },
        { nombre: 'SolSostenido', imagen: 'Notas/SolSostenido.png', sonido: 'sonidos/SolSostenido.mp3' }
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
        imageContainer.innerHTML = `<img src="${notaAleatoria.imagen}" alt="${notaAleatoria.nombre}">`;
        const audio = new Audio(notaAleatoria.sonido);
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
                const audio = new Audio(notaActual.sonido);
                audio.play();
            });
            questionContainer.appendChild(playSoundBtn);
        } else { // Para 'pentagrama' y 'digitacion'
            const img = document.createElement('img');
            img.src = notaActual.imagen;
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