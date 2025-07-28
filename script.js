document.addEventListener('DOMContentLoaded', () => {
    // Definición de las notas con sus propiedades: nombre, imagen y sonido asociado.
    const notas = [
        { nombre: 'AS3', imagen: 'Notas/AS3.png', sonido: 'sonidos/AS3.wav' },
        { nombre: 'AS4', imagen: 'Notas/AS4.png', sonido: 'sonidos/AS4.wav' },
        { nombre: 'AS5', imagen: 'Notas/AS5.png', sonido: 'sonidos/AS5.wav' },
        { nombre: 'A3', imagen: 'Notas/A3.png', sonido: 'sonidos/A3.wav' },
        { nombre: 'A4', imagen: 'Notas/A4.png', sonido: 'sonidos/A4.wav' },
        { nombre: 'A5', imagen: 'Notas/A5.png', sonido: 'sonidos/A5.wav' },
        { nombre: 'B3', imagen: 'Notas/B3.png', sonido: 'sonidos/B3.wav' },
        { nombre: 'B4', imagen: 'Notas/B4.png', sonido: 'sonidos/B4.wav' },
        { nombre: 'B5', imagen: 'Notas/B5.png', sonido: 'sonidos/B5.wav' },
        { nombre: 'CS4', imagen: 'Notas/CS4.png', sonido: 'sonidos/CS4.wav' },
        { nombre: 'CS5', imagen: 'Notas/CS5.png', sonido: 'sonidos/CS5.wav' },
        { nombre: 'C4', imagen: 'Notas/C4.png', sonido: 'sonidos/C4.wav' },
        { nombre: 'C5', imagen: 'Notas/C5.png', sonido: 'sonidos/C5.wav' },
        { nombre: 'C6', imagen: 'Notas/C6.png', sonido: 'sonidos/C6.wav' },
        { nombre: 'DS4', imagen: 'Notas/DS4.png', sonido: 'sonidos/DS4.wav' },
        { nombre: 'DS5', imagen: 'Notas/DS5.png', sonido: 'sonidos/DS5.wav' },
        { nombre: 'D4', imagen: 'Notas/D4.png', sonido: 'sonidos/D4.wav' },
        { nombre: 'D5', imagen: 'Notas/D5.png', sonido: 'sonidos/D5.wav' },
        { nombre: 'E4', imagen: 'Notas/E4.png', sonido: 'sonidos/E4.wav' },
        { nombre: 'E5', imagen: 'Notas/E5.png', sonido: 'sonidos/E5.wav' },
        { nombre: 'FS3', imagen: 'Notas/FS3.png', sonido: 'sonidos/FS3.wav' },
        { nombre: 'FS4', imagen: 'Notas/FS4.png', sonido: 'sonidos/FS4.wav' },
        { nombre: 'FS5', imagen: 'Notas/FS5.png', sonido: 'sonidos/FS5.wav' },
        { nombre: 'F4', imagen: 'Notas/F4.png', sonido: 'sonidos/F4.wav' },
        { nombre: 'F5', imagen: 'Notas/F5.png', sonido: 'sonidos/F5.wav' },
        { nombre: 'GS3', imagen: 'Notas/GS3.png', sonido: 'sonidos/GS3.wav' },
        { nombre: 'GS4', imagen: 'Notas/GS4.png', sonido: 'sonidos/GS4.wav' },
        { nombre: 'GS5', imagen: 'Notas/GS5.png', sonido: 'sonidos/GS5.wav' },
        { nombre: 'G3', imagen: 'Notas/G3.png', sonido: 'sonidos/G3.wav' },
        { nombre: 'G4', imagen: 'Notas/G4.png', sonido: 'sonidos/G4.wav' },
        { nombre: 'G5', imagen: 'Notas/G5.png', sonido: 'sonidos/G5.wav' }
    ];

    let notaActual = null; // Almacena la nota actual en el juego
    let modoJuego = null; // Almacena el modo de juego seleccionado (practica, sonido, pentagrama, digitacion)

    // Elementos del DOM: Se obtienen referencias a los elementos HTML por su ID.
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
    // Oculta los contenedores de juego y práctica y muestra la selección de modo al cargar la página.
    function inicializar() {
        gameContainer.classList.add('hidden');
        practiceContainer.classList.add('hidden');
        modeSelection.classList.remove('hidden');
        nextNoteBtn.classList.add('hidden'); // Ocultar el botón de siguiente nota al inicio
    }

    // --- Lógica del Modo Práctica ---
    // Asigna el evento click al botón de generar nota aleatoria.
    generateButton.addEventListener('click', mostrarNotaAleatoria);

    // Muestra una nota aleatoria en el modo práctica y reproduce su sonido.
    function mostrarNotaAleatoria() {
        generateButton.disabled = false; // Asegurarse de que el botón esté habilitado
        const notaAleatoria = notas[Math.floor(Math.random() * notas.length)];
        imageContainer.innerHTML = `<img src="${notaAleatoria.imagen}" alt="${notaAleatoria.nombre}">`;
        const audio = new Audio(notaAleatoria.sonido);
        audio.play();
    }

    // --- Lógica de Selección de Modo ---
    // Asigna eventos click a los botones de selección de modo.
    practiceModeBtn.addEventListener('click', () => iniciarModo('practica'));
    soundModeBtn.addEventListener('click', () => iniciarModo('sonido'));
    staffModeBtn.addEventListener('click', () => iniciarModo('pentagrama'));
    fingeringModeBtn.addEventListener('click', () => iniciarModo('digitacion'));

    // Inicia el modo de juego seleccionado, mostrando u ocultando los contenedores correspondientes.
    function iniciarModo(modo) {
        modoJuego = modo;
        modeSelection.classList.add('hidden'); // Oculta la selección de modo

        if (modo === 'practica') {
            practiceContainer.classList.remove('hidden'); // Muestra el contenedor de práctica
            gameContainer.classList.add('hidden'); // Oculta el contenedor de juego
            nextNoteBtn.classList.add('hidden'); // Ocultar el botón de siguiente nota en modo práctica
            mostrarNotaAleatoria(); // Muestra la primera nota en modo práctica
        } else {
            practiceContainer.classList.add('hidden'); // Oculta el contenedor de práctica
            gameContainer.classList.remove('hidden'); // Muestra el contenedor de juego
            nextNoteBtn.classList.remove('hidden'); // Mostrar el botón de siguiente nota en modos de juego
            nextNoteBtn.addEventListener('click', iniciarJuego); // Re-añadir el event listener
            iniciarJuego(); // Inicia el juego en el modo seleccionado
        }
    }

    // --- Lógica del Juego ---
    // Inicia una nueva ronda del juego.
    function iniciarJuego() {
        resultContainer.textContent = ''; // Limpia el resultado anterior
        nextNoteBtn.classList.add('hidden'); // Oculta el botón de siguiente nota
        optionsContainer.innerHTML = ''; // Limpia las opciones anteriores

        // 1. Seleccionar una nota correcta al azar
        notaActual = notas[Math.floor(Math.random() * notas.length)];

        // 2. Presentar la pregunta según el modo
        questionContainer.innerHTML = ''; // Limpia la pregunta anterior
        if (modoJuego === 'sonido') {
            const playSoundBtn = document.createElement('button');
            playSoundBtn.textContent = 'Reproducir Sonido';
            playSoundBtn.classList.add('large-button'); // Añadir clase para el estilo
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

    // Genera y muestra las opciones de respuesta para la nota actual.
    function generarOpciones() {
        const opciones = [notaActual.nombre]; // La opción correcta
        // Añade 3 opciones aleatorias más, asegurándose de que no se repitan.
        while (opciones.length < 4) {
            const notaAleatoria = notas[Math.floor(Math.random() * notas.length)].nombre;
            if (!opciones.includes(notaAleatoria)) {
                opciones.push(notaAleatoria);
            }
        }

        // Mezclar las opciones para que no siempre aparezcan en el mismo orden.
        opciones.sort(() => Math.random() - 0.5);

        // Crea botones para cada opción y los añade al contenedor.
        opciones.forEach(opcion => {
            const btn = document.createElement('button');
            btn.textContent = opcion;
            btn.addEventListener('click', () => verificarRespuesta(opcion));
            optionsContainer.appendChild(btn);
        });
    }

    // Verifica la respuesta seleccionada por el usuario.
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
        nextNoteBtn.classList.remove('hidden'); // Muestra el botón de siguiente nota
    }

    // --- Inicialización ---
    // Llama a la función de inicialización cuando el DOM está completamente cargado.
    inicializar();
});