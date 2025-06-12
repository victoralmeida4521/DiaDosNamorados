// Carrossel de imagens
const carouselData = [
    {
        image: "img/foto2.jpeg",
        title: "Nosso primeiro dia dos namorados",
        message: "De muitos outros que virão ao seu lado"
    },
    {
        image: "img/foto1.jpeg",
        title: "Amo cada segundo ao seu lado",
        message: "Minha maior vontade é colecinar lembranças com você"
    },
    {
        image: "img/foto3.jpeg",
        title: "E colecionar muitas tabaquices também",
        message: ""
    },
    {
        image: "img/foto4.jpeg",
        title: "Eu te amo muito",
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
}, 10000);

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
    "d4vid-Feel-it.mp3"
    
    
    
    // Adicione mais nomes de arquivos conforme necessário
];

let currentMusic = 0;
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const playPauseBtn = document.getElementById('mpcPlayPause');
const playPauseIcon = document.getElementById('mpcPlayPauseIcon');
const progressBar = document.getElementById('mpcProgressBar');
const currentTimeSpan = document.getElementById('mpcCurrentTime');
const durationSpan = document.getElementById('mpcDuration');
// const volumeBar = document.getElementById('volumeBar');

function updateMusic() {
    audioSource.src = "musicas/" + musicas[currentMusic];
    audioPlayer.load();
    musicTitle.textContent = musicas[currentMusic];
    playPauseIcon.className = "bi bi-play-fill";
    progressBar.value = 0;
    currentTimeSpan.textContent = "0:00";
    durationSpan.textContent = "0:00";
}
audioPlayer.addEventListener('loadedmetadata', function() {
    durationSpan.textContent = formatTime(audioPlayer.duration);
});
audioPlayer.addEventListener('timeupdate', function() {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    durationSpan.textContent = formatTime(audioPlayer.duration);
});
progressBar.addEventListener('input', function() {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});
// volumeBar.addEventListener('input', function() {
//     audioPlayer.volume = volumeBar.value;
// });
playPauseBtn.addEventListener('click', function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseIcon.className = "bi bi-pause-fill";
    } else {
        audioPlayer.pause();
        playPauseIcon.className = "bi bi-play-fill";
    }
});
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
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
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

#musicTitle {
    font-size: 1rem !important;
}
`;
document.head.appendChild(style);