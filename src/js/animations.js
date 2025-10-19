function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (12 + Math.random() * 6) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

function initBinaryRain() {
    const canvas = document.getElementById('binary-rain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height;
    }

    function draw() {
        ctx.fillStyle = 'rgba(10, 0, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#a855f7';
        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.5 ? '1' : '0';
            const x = i * 20;
            const y = drops[i];

            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i] += 20;
        }
    }

    const interval = setInterval(draw, 50);

    setTimeout(() => {
        clearInterval(interval);
    }, 3000);
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('binary-rain');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initBinaryRain();
});
