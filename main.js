const socket = io(); // Initialize Socket.IO connection
const audio = document.getElementById('audio'); // Get audio element
const uploadInput = document.getElementById('upload'); // Get file input

// Event listener for file selection
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const objectURL = URL.createObjectURL(file); // Create a URL for the selected file
        audio.src = objectURL; // Set the audio source to the selected file
        audio.play() // Automatically play the selected audio
            .catch(error => console.error('Error playing audio:', error)); // Handle any errors when trying to play
        socket.emit('sync', { time: 0 }); // Emit sync event when a new file is loaded
    }
});

// Sync button event listener
document.getElementById('syncButton').addEventListener('click', () => {
    const currentTime = audio.currentTime; // Get current playback time
    socket.emit('sync', { time: currentTime }); // Send current time to server
});

// Listen for sync events from other clients
socket.on('sync', (data) => {
    if (audio.src) { // Ensure there is a source set before syncing
        audio.currentTime = data.time; // Sync audio time with other clients
        if (audio.paused) {
            audio.play() // Play audio if it was paused
                .catch(error => console.error('Error playing audio after sync:', error)); // Handle any errors when trying to play
        }
    }
});

// Reset time when audio ends
audio.addEventListener('ended', () => {
    socket.emit('sync', { time: 0 }); // Notify others that audio has ended
});