const grid = document.getElementById('grid')
const slider = document.getElementById('slider')
const sliderLabel = document.getElementById('sliderValue');
const reset = document.getElementById('reset');
const static = document.getElementById('static');
const rainbow = document.getElementById('rainbow');
const shader = document.getElementById('shader');
const eraser = document.getElementById('eraser');
const picker = document.getElementById('picker');

let color = '#2aa198'
sliderLabel.innerHTML = `Grid Size: ${slider.value} x ${slider.value}`

function sizeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (i=0; i < size**2; i++){
        const pixel = document.createElement('div')
        pixel.className = 'pixel';
        pixel.addEventListener('mouseover', changeColor);
        grid.appendChild(pixel);
    }
}

function changeColor(e) {
    let pix = e.target;
    pix.style.backgroundColor= color ;
}
    
function resetGrid() {
   grid.innerHTML= ""
}

function updateSize() {
    resetGrid();
    sliderLabel.textContent = `Grid Size: ${slider.value} x ${slider.value}`;
    sizeGrid(slider.value);
}

function updateColor(e) {
    color = e.target.value;
}

function startUp() {
    sizeGrid(slider.value);
    picker.value = color;
    picker.addEventListener("input", updateColor, false);
    picker.select();
    slider.addEventListener('input', updateSize);
    reset.addEventListener('click', updateSize);
    eraser.addEventListener('click', ()=> color= '#fdf6e3')

}

startUp();