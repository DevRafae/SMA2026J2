const container = document.getElementById('gameContainer');
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

const timerElement = document.getElementById('timer');
const modal = document.getElementById('finishModal');
const totalTimeElement = document.getElementById('totalTime');

let selectedBox = null;
let connections = []; 
const totalPairs = 6; 

// Variáveis do Cronômetro
let startTime;
let timerInterval;
let elapsedTime = 0;

// Inicialização do Jogo
function init() {
    resizeCanvas();
    startTimer();
    
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', () => handleSelection(box));
    });

    /* ALTERAÇÃO/CORREÇÃO: 
      Garante que, se o usuário rolar a tela em dispositivos móveis 
      ou iFrames menores, as linhas acompanhem o movimento das caixas.
    */
    window.addEventListener('scroll', drawConnections);
}

function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    drawConnections();
}

window.addEventListener('resize', resizeCanvas);
setTimeout(resizeCanvas, 150);

// Controle do Cronômetro
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timerElement.textContent = formatTime(elapsedTime);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const padMin = String(minutes).padStart(2, '0');
    const padSec = String(seconds).padStart(2, '0');
    return `${padMin}:${padSec}`;
}

// Lógica de Seleção
function handleSelection(box) {
    if (box.classList.contains('correct')) return;

    const isLeft = box.parentElement.classList.contains('left-col');
    clearIncorrectFeedback();

    if (!selectedBox) {
        if (isLeft) {
            selectedBox = box;
            box.classList.add('selected');
        }
    } else {
        if (!isLeft) {
            if (selectedBox.dataset.id === box.dataset.target) {
                selectedBox.classList.remove('selected');
                selectedBox.classList.add('correct');
                box.classList.add('correct');
                
                connections.push({ from: selectedBox, to: box });
                drawConnections();
                
                selectedBox = null;

                if (connections.length === totalPairs) {
                    endGame();
                }
            } else {
                selectedBox.classList.remove('selected');
                selectedBox.classList.add('incorrect');
                box.classList.add('incorrect');
                
                selectedBox = null;
            }
        } else {
            selectedBox.classList.remove('selected');
            selectedBox = box;
            box.classList.add('selected');
        }
    }
}

function clearIncorrectFeedback() {
    document.querySelectorAll('.box').forEach(box => box.classList.remove('incorrect'));
}

// Desenha as linhas
function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    connections.forEach(conn => {
        const rectFrom = conn.from.getBoundingClientRect();
        const rectTo = conn.to.getBoundingClientRect();
        const rectContainer = container.getBoundingClientRect();

        const x1 = rectFrom.right - rectContainer.left;
        const y1 = rectFrom.top + (rectFrom.height / 2) - rectContainer.top;

        const x2 = rectTo.left - rectContainer.left;
        const y2 = rectTo.top + (rectTo.height / 2) - rectContainer.top;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#4caf50'; 
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
    });
}

// Finalização do Jogo
function endGame() {
    stopTimer();
    const finalTimeStr = formatTime(elapsedTime);
    totalTimeElement.textContent = finalTimeStr;
    
    // Abre a tela de aviso orientando sobre o clique na página externa
    modal.classList.add('active');
}

init();
