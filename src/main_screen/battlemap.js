var battlemap;
var panX = 0;
var panY = 0;
var scale = 1;

window.onload = function() {
    battlemap = document.querySelector('.battlemap');
    console.log('battlemap');
    if (!battlemap) {
        console.error('Element with class "battlemap" not found.');
        return;
    }

    let isPanning = false;
    let startX, startY;
    let zoomMin = 0.1;
    let zoomMax = 100;

    battlemap.addEventListener('mousedown', (e) => {
        isPanning = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        battlemap.style.cursor = 'grabbing';
    });

    battlemap.addEventListener('mouseup', () => {
        isPanning = false;
        battlemap.style.cursor = 'grab';
    });

    battlemap.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        updateTransform();
    });

    battlemap.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        scale = Math.min(Math.max(zoomMin, scale + delta), zoomMax)
        updateTransform();
    });

    function updateTransform() {
        battlemap.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    }
};

function updateGridSize(rows, columns) {
    const grid = document.querySelector('.grid');
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.innerHTML = '';
    // add in the divs into the html
    let gridDiv = '<div class="grid-item"></div>';
    for (let i = 0; i < columns * rows; i++) {
        grid.innerHTML += gridDiv;
    }
}