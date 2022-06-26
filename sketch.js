const grid = document.getElementById('grid')
const slider = document.getElementById('slider')
const sliderLabel = document.getElementById('sliderValue');
const reset = document.getElementById('reset');
const staticBtn = document.getElementById('static');
const rainbowBtn = document.getElementById('rainbow');
const eraserBtn = document.getElementById('eraser');
const picker = document.getElementById('picker');

let static = true;
let random = false;
let eraser = false;
let brush = false;

let color = '#2aa198'
sliderLabel.innerHTML = `Grid Size: ${slider.value} x ${slider.value}`

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
    if (random) pix.style.backgroundColor = randomColor();
    else if (eraser) pix.style.backgroundColor = '#fdf6e3'
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
    setStatic();
}

function randomColor() {
    solarized = ['#859900', '#2aa198', '#268bd2', '#6c71c4', '#d33682', 
            '#dc322f', '#cb4b16', '#b58900']
    console.log(color)
    return color = solarized[Math.floor(Math.random()*solarized.length)]
}

function setStatic () {
    eraserBtn.className = '';
    rainbowBtn.className = '';
    staticBtn.className ='picked';
    static = true;
    random = false;
    eraser = false;
}

function setRandom () {
    eraserBtn.className = '';
    rainbowBtn.className = 'picked'
    staticBtn.className =''
    static = false;
    random = true;
    eraser = false;
}

function setEraser () {
    eraserBtn.className = 'picked';
    rainbowBtn.className = ''
    staticBtn.className =''
    eraser = true;
    random = false;
    static = false;
}

function toggleBrush () {
    let pixels = Array.from(document.getElementsByClassName('pixel'));
    if (brush) {
        brush = false;
        for (pixel of pixels) {
            pixel.removeEventListener('mouseover', changeColor);
            pixel.removeEventListener('touchmove', changeColor);
        }
    }
    else {
        brush = true;
        for (pixel of pixels) {
            pixel.addEventListener('mouseover', changeColor);
            pixel.addEventListener('touchmove', changeColor);
        }
    }
}

function startUp() {
    setStatic();
    sizeGrid(slider.value);
    picker.value = color;
    picker.style.backgroundColor = color;
    picker.addEventListener("input", updateColor, false);
    picker.select();
    slider.addEventListener('input', updateSize);
    reset.addEventListener('click', updateSize);
    staticBtn.addEventListener('click', setStatic)
    eraserBtn.addEventListener('click', setEraser)
    rainbowBtn.addEventListener('click', setRandom)
    grid.addEventListener('click', toggleBrush)
}

startUp();