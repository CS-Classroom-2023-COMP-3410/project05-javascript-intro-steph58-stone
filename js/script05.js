const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const brushColorInput = document.getElementById('brush-color');
const brushSizeInput = document.getElementById('brush-size');
const canvasBgInput = document.getElementById('canvas-bg');
const undoButton = document.getElementById('undo');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;
ctx.fillStyle = canvasBgInput.value;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let drawing = false;
let brushColor = brushColorInput.value;
let brushSize = brushSizeInput.value;
let canvasHistory = [];

function saveCanvasState() {
    canvasHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    saveCanvasState();
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});

brushColorInput.addEventListener('input', (e) => {
    brushColor = e.target.value;
});

brushSizeInput.addEventListener('input', (e) => {
    brushSize = e.target.value;
});

canvasBgInput.addEventListener('input', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
});

undoButton.addEventListener('click', () => {
    if (canvasHistory.length > 0) {
        ctx.putImageData(canvasHistory.pop(), 0, 0);
    }
});

clearButton.addEventListener('click', () => {
    ctx.fillStyle = canvasBgInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvasHistory = [];
});

saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'canvas-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});
