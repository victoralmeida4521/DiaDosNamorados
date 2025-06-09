// Carrossel de imagens
const carouselData = [
    {
        image: "img/foto2.jpeg",
        title: "Momentos Felizes",
        message: "Cada sorriso seu é um presente para mim."
    },
    {
        image: "img/foto1.jpeg",
        title: "Momentos Felizes",
        message: "Cada sorriso seu é um presente para mim."
    },
    {
        image: "img/foto3.jpeg",
        title: "Momentos Felizes",
        message: "Cada sorriso seu é um presente para mim."
    },
    {
        image: "img/foto4.jpeg",
        title: "Momentos Felizes",
        message: "Cada sorriso seu é um presente para mim."
    }
];
let currentIndex = 0;
const carouselImage = document.getElementById('carouselImage');
const carouselTitle = document.getElementById('carouselTitle');
const carouselMessage = document.getElementById('carouselMessage');

function updateCarousel() {
    const data = carouselData[currentIndex];
    carouselImage.src = data.image;
    carouselTitle.textContent = data.title;
    carouselMessage.textContent = data.message;
}

// Inicializa o carrossel na primeira imagem
updateCarousel();

// Troca automática a cada 6 segundos
let carouselInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselData.length;
    updateCarousel();
}, 6000);

// Botões de navegação
document.getElementById('prevBtn').onclick = function() {
    currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
    updateCarousel();
};
document.getElementById('nextBtn').onclick = function() {
    currentIndex = (currentIndex + 1) % carouselData.length;
    updateCarousel();
};

// Função para pausar o carrossel automático
function pauseCarousel() {
    clearInterval(carouselInterval);
}

// Exemplo: pause ao clicar na imagem
carouselImage.onclick = pauseCarousel;

// Contador de tempo juntos
const startDate = new Date(2025, 1, 22, 0, 0, 0); // 22 de março de 2025

function updateCounter() {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        // Ajusta para o mês anterior
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }
    months += years * 12;

    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}
setInterval(updateCounter, 1000);
updateCounter();

// Lista de músicas (adicione aqui os nomes dos arquivos que colocar na pasta 'musicas')
const musicas = [
    "d4vid-Feel-it.mp3",
    "Reginaldo Rossi - A Raposa e as Uvas.mp3",
    "Chezile-Beanie.mp3",
    
    // Adicione mais nomes de arquivos conforme necessário
];

let currentMusic = 0;
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const musicTitle = document.getElementById('musicTitle');
const playPauseBtn = document.getElementById('playPause');
const playPauseIcon = document.getElementById('playPauseIcon');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volumeBar');

function updateMusic() {
    audioSource.src = "musicas/" + musicas[currentMusic];
    audioPlayer.load();
    musicTitle.textContent = musicas[currentMusic];
    playPauseIcon.className = "bi bi-play-fill";
    progressBar.value = 0;
    currentTimeEl.textContent = "0:00";
    durationEl.textContent = "0:00";
}
audioPlayer.addEventListener('loadedmetadata', function() {
    durationEl.textContent = formatTime(audioPlayer.duration);
});
audioPlayer.addEventListener('timeupdate', function() {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});
progressBar.addEventListener('input', function() {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});
volumeBar.addEventListener('input', function() {
    audioPlayer.volume = volumeBar.value;
});
playPauseBtn.onclick = function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseIcon.className = "bi bi-pause-fill";
    } else {
        audioPlayer.pause();
        playPauseIcon.className = "bi bi-play-fill";
    }
};
audioPlayer.addEventListener('play', function() {
    playPauseIcon.className = "bi bi-pause-fill";
});
audioPlayer.addEventListener('pause', function() {
    playPauseIcon.className = "bi bi-play-fill";
});
audioPlayer.addEventListener('ended', function() {
    currentMusic = (currentMusic + 1) % musicas.length;
    updateMusic();
    audioPlayer.play();
});
document.getElementById('prevMusic').onclick = function() {
    currentMusic = (currentMusic - 1 + musicas.length) % musicas.length;
    updateMusic();
    audioPlayer.play();
};
document.getElementById('nextMusic').onclick = function() {
    currentMusic = (currentMusic + 1) % musicas.length;
    updateMusic();
    audioPlayer.play();
};
function formatTime(sec) {
    sec = Math.floor(sec);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
}
updateMusic();

// Estilos personalizados
const style = document.createElement('style');
style.textContent = `
.music-player-minimal {
    padding: 0.7rem 0.5rem !important;
    max-width: 220px !important;
}
.btn-music-minimal {
    font-size: 1.2rem !important;
    padding: 0.1rem 0.4rem !important;
}
#progressBar, #volumeBar {
    height: 3px !important;
}
#musicTitle {
    font-size: 1rem !important;
}
`;
document.head.appendChild(style);