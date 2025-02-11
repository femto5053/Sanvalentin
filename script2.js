const gameArea = document.getElementById("game-area");
const scoreElement = document.getElementById("score");
const progressBar = document.querySelector(".progress");
let score = 0;
let heartInterval;

function spawnHeart() {
    if (score >= 33) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "🐧";
    heart.style.left = `${Math.random() * 90}vw`;
    heart.style.top = `-50px`;

    heart.addEventListener("click", () => {
        score++;
        scoreElement.textContent = score;
        progressBar.style.width = `${(score / 33) * 100}%`;
        heart.remove();

        if (score === 33) {
            /*clearInterval(heartInterval);
            alert("¡Felicidades! 🎉");*/
            
            // Añadir mensaje de cuenta regresiva
            let countdown = 5;
            const countdownMessage = document.createElement("div");
            countdownMessage.style.position = "fixed";
            countdownMessage.style.top = "50%";
            countdownMessage.style.left = "50%";
            countdownMessage.style.transform = "translate(-50%, -50%)";
            countdownMessage.style.fontSize = "24px";
            countdownMessage.style.color = "#ff0066";
            countdownMessage.style.fontWeight = "bold";
            document.body.appendChild(countdownMessage);

            const countdownInterval = setInterval(() => {
                countdownMessage.textContent = `Felicidades! 🎉\n Espera unos ${countdown} segundos...`;
                countdown--;
                
                if (countdown < 0) {
                    clearInterval(countdownInterval);
                    window.location.href = "nicki.html";
                }
            }, 1000);
        }
    });

    gameArea.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

heartInterval = setInterval(spawnHeart, 1000);

// Partículas en el fondo
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 2,
        speedY: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
    };
}

for (let i = 0; i < 50; i++) {
    particles.push(createParticle());
}
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particles) {
        ctx.fillStyle = `rgba(255, 0, 100, ${particle.opacity})`;
        ctx.font = `${particle.size}px Arial`;
        ctx.fillText("🐧", particle.x, particle.y);
        particle.y += particle.speedY;  // 🔄 Ahora cae hacia abajo

        if (particle.y > canvas.height) {
            particle.y = -10;
            particle.x = Math.random() * canvas.width;
        }
    }
    
    requestAnimationFrame(drawParticles);
}
document.addEventListener("click", () => {
    const music = document.getElementById("music");
    music.play();  // Inicia el audio cuando el usuario haga clic

    // Aquí puedes modificar el volumen tras la interacción
    music.volume = 0.2;  // Cambiar volumen a 20% después del clic
});
function playerWon() {
    // Cambiar el volumen a 20% cuando gane
    music.volume = 0.5;  // Establecer volumen a 20%
    
    // Lógica para el mensaje de victoria y transición
    let countdown = 5;
    const countdownMessage = document.createElement("div");
    countdownMessage.style.position = "fixed";
    countdownMessage.style.top = "50%";
    countdownMessage.style.left = "50%";
    countdownMessage.style.transform = "translate(-50%, -50%)";
    countdownMessage.style.fontSize = "24px";
    countdownMessage.style.color = "#ff0066";
    countdownMessage.style.fontWeight = "bold";
    document.body.appendChild(countdownMessage);

    const countdownInterval = setInterval(() => {
        countdownMessage.textContent = `¡Felicidades! 🎉\n Espera unos ${countdown} segundos...`;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(countdownInterval);
            window.location.href = "nicki.html";
        }
    }, 1000);
}

drawParticles();