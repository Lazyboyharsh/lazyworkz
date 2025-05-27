// Custom cursor elements
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

// Track mouse movement
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Smooth animation settings
const smoothFactor = 0.15;
let isHovering = false;

// Update cursor position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor
function animateCursor() {
    // Smooth outline movement
    outlineX += (mouseX - outlineX) * smoothFactor;
    outlineY += (mouseY - outlineY) * smoothFactor;
    
    // Update cursor positions
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, [role="button"]');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(0.5)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1.5)`;
        isHovering = true;
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) scale(1)`;
        isHovering = false;
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseout', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
});

document.addEventListener('mouseover', () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
});

// Add cursor trail effect
let trail = [];
const trailLength = 10;

for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    dot.style.cssText = `
        width: 4px;
        height: 4px;
        background: rgba(0, 0, 0, ${1 - i / trailLength});
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(dot);
    trail.push({
        element: dot,
        x: 0,
        y: 0
    });
}

// Animate trail
function updateTrail() {
    trail.forEach((dot, index) => {
        if (index === 0) {
            dot.x = mouseX;
            dot.y = mouseY;
        } else {
            dot.x += (trail[index - 1].x - dot.x) * 0.3;
            dot.y += (trail[index - 1].y - dot.y) * 0.3;
        }
        dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
    });
    requestAnimationFrame(updateTrail);
}

updateTrail(); 