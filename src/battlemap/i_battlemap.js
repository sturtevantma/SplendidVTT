const zoomableImage = document.getElementById('zoomable-image');
let scale = 1;
let panX = 0, panY = 0;
let isPanning = false, startX = 0, startY = 0;

// Handle zoom using mouse wheel
zoomableImage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomAmount = 0.1;
    if (e.deltaY < 0) {
        scale += zoomAmount; // Zoom in
    } else {
        scale -= zoomAmount; // Zoom out
    }
    scale = Math.min(Math.max(0.5, scale), 3); // Limit zoom levels
    applyTransform();
});

// Start panning when mouse is down
zoomableImage.addEventListener('mousedown', (e) => {
    isPanning = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
});

// Move image during panning
window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    applyTransform();
});

// Stop panning on mouse up
window.addEventListener('mouseup', () => {
    isPanning = false;
});

// Apply transform for zoom and pan
function applyTransform() {
    zoomableImage.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
}
