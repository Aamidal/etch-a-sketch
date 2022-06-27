const grid = document.getElementById('grid')
const slider = document.getElementById('slider')
const sliderLabel = document.getElementById('sliderValue');
const reset = document.getElementById('reset');
const staticBtn = document.getElementById('static');
const rainbowBtn = document.getElementById('rainbow');
const eraserBtn = document.getElementById('eraser');
const picker = document.getElementById('picker');
const brushBtn = document.getElementById('brush');
let brushType = 'static';
let brush = false;
let color = '#2aa198'

function sizeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (i=0; i < size**2; i++){
        const pixel = document.createElement('div')
        pixel.className = 'pixel';
        grid.appendChild(pixel);
    }
}

function changeColor(e) {
    let pix = e.target;
    if (brushType == 'random') pix.style.backgroundColor = randomColor();
    else if (brushType == 'eraser') pix.style.backgroundColor = '#fdf6e3'
    else pix.style.backgroundColor = picker.value;
}

function updateSize() {
    grid.innerHTML= "";
    sliderLabel.textContent = `Grid Size: ${slider.value} x ${slider.value}`;
    sizeGrid(slider.value);
}

function updateColor(e) {
    color = e.target.value;
    picker.style.backgroundColor = color;
    setBrush();
}

function randomColor() {
    solarized = ['#859900', '#2aa198', '#268bd2', '#6c71c4', '#d33682', 
            '#dc322f', '#cb4b16', '#b58900']
    return color = solarized[Math.floor(Math.random()*solarized.length)]
}

function setBrush (brushBtn=staticBtn, type='static') {
    clearBtns();
    brushBtn.className = 'picked';
    brushType = type;
}

function clearBtns() {
    eraserBtn.className = '';
    staticBtn.className = '';
    rainbowBtn.className = '';
}

function toggleBrush () {
    let pixels = Array.from(document.getElementsByClassName('pixel'));
    if (brush) {
        brush = false;
        brushBtn.className = '';
        brushBtn.textContent = 'Brush: Off';
        for (pixel of pixels) {
            pixel.removeEventListener('mouseover', changeColor);
            pixel.removeEventListener('touchmove', changeColor);
        }
    }
    else {
        brush = true;
        brushBtn.className = 'picked';
        brushBtn.textContent = 'Brush: On!';
        for (pixel of pixels) {
            pixel.addEventListener('mouseover', changeColor);
            pixel.addEventListener('touchmove', changeColor);
        }
    }
}

setBrush();
updateSize();
picker.value = color;
picker.style.backgroundColor = color;
picker.addEventListener("input", updateColor, false);
picker.select();
slider.addEventListener('input', updateSize);
reset.addEventListener('click', updateSize);
staticBtn.addEventListener('click', ()=>setBrush(staticBtn, 'static'))
eraserBtn.addEventListener('click', ()=> setBrush(eraserBtn, 'eraser'))
rainbowBtn.addEventListener('click', ()=>setBrush(rainbowBtn, 'random'))
grid.addEventListener('click', toggleBrush)