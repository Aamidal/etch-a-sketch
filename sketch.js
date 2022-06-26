const grid = document.getElementById('grid')
const slider = document.getElementById('slider')
const sliderLabel = document.getElementById('sliderValue');
let color = 'var(--base0)';
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
    console.log(e.target);
    let pix = e.target;
    pix.style.backgroundColor= color ;
}
    
function resetGrid() {
   grid.innerHTML= ""
}

sizeGrid(slider.value);

slider.oninput = function() {
    resetGrid();
    sliderLabel.textContent = `Grid Size: ${slider.value} x ${slider.value}`;
    sizeGrid(slider.value);
}