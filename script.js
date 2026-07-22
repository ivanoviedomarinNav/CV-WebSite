const canvas = document.getElementById('codeBackground');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = 1400;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const characters = `
    <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
    <title>Ivan Oviedo</title><link rel="stylesheet" href="style.css">
    <nav class="top-menu"><a href="about.html">About Me</a></nav>
    <header class="hero"><img src="images/ppers.svg" class="character">
    <h1 class="name">IVAN OVIEDO</h1></header>
    <section class="welcome-box"><p>Hi, my name is Ivan Oviedo Marin</p></section>
    .skills { padding: 60px 40px; } .skill-bar { background: #4fc3f7; }
    @keyframes float1 { transform: translate(15px, -20px) rotate(5deg); }
    const canvas = document.getElementById('codeBackground');
    function draw() { ctx.fillText(text, x, y); drops[i]++; }
    const drops = Array(columns).fill(0).map(() => Math.random() * -50);
`.replace(/\s+/g, ' ');
const fontSize = 15;
const columns = Math.floor(canvas.width / fontSize);

// Cada columna guarda en qué altura (fila) va cayendo su carácter
const drops = Array(columns).fill(0).map(() => Math.random() * -50);

function draw() {
    // Capa semitransparente para crear el efecto de "estela" al caer
ctx.globalCompositeOperation = 'destination-out';
ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = 'source-over';

ctx.fillStyle = 'rgba(127, 212, 245, 0.5)';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Cuando la columna llega abajo, la reinicia arriba (con algo de aleatoriedad)
        if (y > canvas.height && Math.random() > 0.985) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 60);