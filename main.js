const socket = io(); 
const audio = document.getElementById('audio'); 
const uploadInput = document.getElementById('upload'); 


uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; 
    if (file) {
        const objectURL = URL.createObjectURL(file); 
        audio.src = objectURL; 
        audio.play() 
            .catch(error => console.error('Error playing audio:', error)); 
        socket.emit('sync', { time: 0 }); 
    }
});


document.getElementById('syncButton').addEventListener('click', () => {
    const currentTime = audio.currentTime; 
    socket.emit('sync', { time: currentTime }); 
});


socket.on('sync', (data) => {
    if (audio.src) { 
        audio.currentTime = data.time; 
        if (audio.paused) {
            audio.play() 
                .catch(error => console.error('Error playing audio after sync:', error)); 
        }
    }
});

// Reset time when audio ends
audio.addEventListener('ended', () => {
    socket.emit('sync', { time: 0 }); // Notify others that audio has ended
});
