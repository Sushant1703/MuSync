document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    const audio = document.getElementById('audio');
    const source = document.getElementById('audioSource');

    if (file) {
        const objectURL = URL.createObjectURL(file); 
        source.src = objectURL; 
        source.type = file.type; 
        audio.load(); 
        audio.play(); 
        socket.emit('sync', { time: 0 }); 
    }
});