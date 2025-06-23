// Simple color array
const simpleColors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 
    'pink', 'cyan', 'magenta', 'lime', 'indigo', 'violet',
    'crimson', 'navy', 'teal', 'gold', 'coral', 'salmon'
];

// Hex characters for random hex generation
const hexChars = '0123456789ABCDEF';

let currentMode = 'simple';

// Get DOM elements
const colorName = document.getElementById('colorName');
const flipBtn = document.getElementById('flipBtn');
const modeButtons = document.querySelectorAll('.mode-btn');
const body = document.body;

// Generate random hex color
function getRandomHex() {
    let hex = '#';
    for (let i = 0; i < 6; i++) {
        hex += hexChars[Math.floor(Math.random() * 16)];
    }
    return hex;
}

// Get random simple color
function getRandomSimpleColor() {
    return simpleColors[Math.floor(Math.random() * simpleColors.length)];
}

// Update background and display
function flipColor() {
    let newColor;
    
    if (currentMode === 'simple') {
        newColor = getRandomSimpleColor();
    } else {
        newColor = getRandomHex();
    }
    
    // Create gradient background
    const secondColor = currentMode === 'hex' ? getRandomHex() : getRandomSimpleColor();
    body.style.background = `linear-gradient(135deg, ${newColor} 0%, ${secondColor} 100%)`;
    
    // Update color name display
    colorName.textContent = newColor;
    
    // Add a subtle animation effect
    colorName.style.transform = 'scale(1.1)';
    setTimeout(() => {
        colorName.style.transform = 'scale(1)';
    }, 200);
}

// Handle mode switching
function switchMode(mode) {
    currentMode = mode;
    
    // Update active button
    modeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });
    
    // Flip to new color in the selected mode
    flipColor();
}

// Event listeners
flipBtn.addEventListener('click', flipColor);

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchMode(btn.dataset.mode);
    });
});

// Initialize with a random color
flipColor();