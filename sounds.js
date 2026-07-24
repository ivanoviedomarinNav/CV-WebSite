const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.30;
const soundToggle = document.getElementById('soundToggle');
let soundEnabled = localStorage.getItem('soundEnabled') === 'true';

function updateUI() {
    soundToggle.classList.toggle('muted', !soundEnabled);
}

soundToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    updateUI();
    if (soundEnabled) bgMusic.play().catch(() => {});
    else bgMusic.pause();
});

updateUI();
if (soundEnabled) bgMusic.play().catch(() => {});
