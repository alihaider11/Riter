// Configuration for the background drawing animation
const config = {
    maxElements: 20, // Maximum number of SVG drawings on screen at once
    minSize: 50,     // Minimum size factor for the drawings
    maxSize: 500,    // Maximum size factor for the drawings
    minDuration: 4,  // Minimum duration for the drawing animation (seconds)
    maxDuration: 12, // Maximum duration for the drawing animation (seconds)
    colors: ['#fbbf24', '#d97706', '#f59e0b', '#eab308', '#8b5cf6'] // Amber/Purple palette
};

// Predefined SVG path data for different drawing shapes
const drawingPaths = [
    // Simple rectangle
    "M 50 20 L 150 20 L 150 80 L 50 80 Z",
    // Line with arrow
    "M 30 50 L 170 50 M 160 40 L 170 50 L 160 60",
    // Circle
    "M 100 50 A 50 50 0 1 0 100 51 A 50 50 0 1 0 100 50",
    // Triangle
    "M 50 80 L 100 20 L 150 80 Z",
    // Wavy line
    "M 20 50 Q 40 30, 60 50 Q 80 70, 100 50 Q 120 30, 140 50 Q 160 70, 180 50",

        // Arrow pointing left
    "M 170 50 L 30 50 M 40 40 L 30 50 L 40 60",
    // Arrow pointing up
    "M 100 70 L 100 30 M 90 40 L 100 30 L 110 40",
    // Arrow pointing down
    "M 100 30 L 100 70 M 90 60 L 100 70 L 110 60",
    // Diagonal arrow (top-left to bottom-right)
    "M 20 80 L 180 20 M 165 25 L 180 20 L 175 35",
    // Diagonal arrow (bottom-left to top-right)
    "M 20 20 L 180 80 M 165 75 L 180 80 L 175 65",
    // Plus sign
    "M 100 20 L 100 80 M 70 50 L 130 50",
    // Minus sign
    "M 70 50 L 130 50",
    // Cross (X)
    "M 70 30 L 130 70 M 130 30 L 70 70",
    // Pentagon
    "M 100 20 L 140 45 L 125 90 L 75 90 L 60 45 Z",
    // Hexagon
    "M 70 30 L 130 30 L 150 60 L 130 90 L 70 90 L 50 60 Z",
    // Octagon (simplified)
    "M 65 30 L 85 25 L 115 25 L 135 30 L 140 50 L 140 70 L 135 85 L 115 90 L 85 90 L 65 85 L 60 70 L 60 50 Z",
    // Star (5-point, approximate)
    "M 100 20 L 118 60 L 160 65 L 128 95 L 140 135 L 100 110 L 60 135 L 72 95 L 40 65 L 82 60 Z",
    // Heart (approximate)
    "M 100 60 C 100 40, 80 40, 80 60 C 80 80, 100 100, 100 100 C 100 100, 120 80, 120 60 C 120 40, 100 40, 100 60",
    // Lightning bolt
    "M 90 20 L 110 20 L 100 50 L 120 50 L 90 90 L 100 60 L 90 60 Z",
    // Cloud (simplified)
    "M 60 60 Q 60 40, 80 40 Q 90 20, 110 30 Q 130 20, 140 40 Q 140 60, 120 60 Q 130 80, 110 70 Q 90 80, 80 70 Q 70 80, 60 60",
    // Speech bubble
    "M 50 30 L 150 30 L 150 70 L 130 70 L 120 90 L 110 70 L 50 70 Z"

];

// Function to generate a random drawing SVG element
function generateRandomDrawing() {
    const svgNS = "http://www.w3.org/2000/svg";
    const container = document.getElementById('background-container');

    // Create SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add("absolute", "pen-stroke", "overflow-visible");
    svg.setAttribute("width", "200"); // Base width
    svg.setAttribute("height", "100"); // Base height
    svg.setAttribute("viewBox", "0 0 200 100"); // Maintain aspect ratio for paths
    svg.setAttribute("fill", "none");

    // Select a random path and add it to the SVG
    const randomPathData = drawingPaths[Math.floor(Math.random() * drawingPaths.length)];
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", randomPathData);
    svg.appendChild(path);

    // Randomize color, size, position, and animation duration
    const randomColor = config.colors[Math.floor(Math.random() * config.colors.length)];
    const randomSizeFactor = (Math.random() * (config.maxSize - config.minSize) + config.minSize) / 100;
    const randomX = Math.random() * (window.innerWidth - (200 * randomSizeFactor));
    const randomY = Math.random() * (window.innerHeight - (100 * randomSizeFactor));
    const randomDuration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;

    // Apply styles and transformations
    path.setAttribute("stroke", randomColor);
    svg.style.width = `${300 * randomSizeFactor}px`;
    svg.style.height = `${100 * randomSizeFactor}px`;
    svg.style.left = `${randomX}px`;
    svg.style.top = `${randomY}px`;
    svg.style.opacity = `${0.1 + Math.random() * 0.15}`; // Low opacity for subtle effect
    path.style.setProperty('--path-length', path.getTotalLength().toString()); // Set CSS variable for dasharray
    path.classList.add('animated-path');
    path.style.animationDuration = `${randomDuration}s`;

    // Append the SVG to the container
    container.appendChild(svg);

    // Remove the element after its animation completes
    setTimeout(() => {
        if (svg.parentNode) {
            svg.parentNode.removeChild(svg);
        }
    }, randomDuration * 1000);
}

// Initialize the background animation
function initBackgroundAnimation() {
    // Initial batch of drawings
    for (let i = 0; i < config.maxElements; i++) {
        setTimeout(() => generateRandomDrawing(), i * 1000); // Stagger initial creation
    }

    // Continuously add new drawings
    setInterval(() => {
        if (document.querySelectorAll('#background-container svg').length < config.maxElements) {
            generateRandomDrawing();
        }
    }, 500); // Check every 2 seconds if a new drawing can be added
}

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', initBackgroundAnimation);

// Update SVG positions on window resize (basic implementation)
window.addEventListener('resize', () => {
    // In a more complex animation, you might need to reposition or regenerate elements.
    // For this implementation, relying on absolute positioning and opacity is sufficient for responsiveness.
});