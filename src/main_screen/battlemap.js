var battlemap, zoomableImage;

window.onload = function() {
    battlemap = document.querySelector('.battlemap');
    zoomableImage = document.getElementById('zoomable-image');
    console.log('battlemap');
    if (!battlemap) {
        console.error('Element with class "battlemap" not found.');
        return;
    }

    let scale = 1;
    let panX = 0;
    let panY = 0;
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