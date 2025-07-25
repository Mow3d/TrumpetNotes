document.getElementById('generateButton').addEventListener('click', function() {
    // Nombres de archivo de tus imágenes y sonidos
    const notes = [
        {image: 'Do4.png', sound: 'Do4.mp3'},
        {image: 'DoSostenido.png', sound: 'DoSostenido.mp3'},
        {image: 'Re.png', sound: 'Re.mp3'},
        {image: 'ReSostenido.png', sound: 'ReSostenido.mp3'},
        {image: 'Mi.png', sound: 'Mi.mp3'},
        {image: 'Fa.png', sound: 'Fa.mp3'},
        {image: 'FaSostenido.png', sound: 'FaSostenido.mp3'},
        {image: 'Sol.png', sound: 'Sol.mp3'},
        {image: 'SolSostenido.png', sound: 'SolSostenido.mp3'},
        {image: 'La.png', sound: 'La.mp3'},
        {image: 'LaSostenido.png', sound: 'LaSostenido.mp3'},
        {image: 'Si.png', sound: 'Si.mp3'},
        {image: 'Do5.png', sound: 'Do5.mp3'},
        
        // Añade todos los elementos necesarios aquí
    ];

    // Generar un índice aleatorio basado en la longitud del arreglo de notas
    const randomIndex = Math.floor(Math.random() * notes.length);

    // Construir la ruta de la imagen y del sonido
    const imagePath = 'notas/' + notes[randomIndex].image;
    const soundPath = 'sonidos/' + notes[randomIndex].sound;

    // Mostrar la imagen
    document.getElementById('imageContainer').innerHTML = `<img src="${imagePath}" alt="Imagen de Nota">`;

    // Reproducir el sonido
    const audio = new Audio(soundPath);
    audio.play();
});
