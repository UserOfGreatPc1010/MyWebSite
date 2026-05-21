const startButton = document.getElementById('start-button');

if (startButton) {
    startButton.addEventListener('click', function() {
        // Reset points when starting a fresh game
        localStorage.setItem('gamePoints', 0); 
        window.location.href = "assets/levels/firstlvl/firstlvl.html";
    });
}

const levelImage = document.querySelector('img.level-image');
const answers = document.querySelectorAll('area[data-answer]');
const wrongPopup = document.getElementById('wrong-popup');
const pointsDisplay = document.getElementById('points-display');

// Use a global variable to keep track of state within the page session
let currentPoints = 0;

function loadPoints() {
    const savedPoints = localStorage.getItem('gamePoints');
    // Ensure we always have a valid number
    currentPoints = savedPoints ? parseInt(savedPoints, 10) : 0;
    
    updateDisplay();
}

function updateDisplay() {
    if (pointsDisplay) {
        pointsDisplay.textContent = `Poeng: ${currentPoints}`;
    }
}

function savePoints(points) {
    localStorage.setItem('gamePoints', points);
}

if (levelImage && answers.length && wrongPopup) {
    let popupTimer;
    
    // Initialize points on load
    loadPoints();

    function resizeImageMap() {
        if (!levelImage.naturalWidth) return;
        const scaleX = levelImage.clientWidth / levelImage.naturalWidth;
        const scaleY = levelImage.clientHeight / levelImage.naturalHeight;

        answers.forEach(function(answer) {
            const originalCoords = answer.dataset.coords.split(',').map(Number);
            const scaledCoords = originalCoords.map(function(coord, index) {
                return Math.round(coord * (index % 2 === 0 ? scaleX : scaleY));
            });
            answer.coords = scaledCoords.join(',');
        });
    }

    answers.forEach(function(answer) {
        answer.addEventListener('click', function(event) {
            event.preventDefault();

            if (answer.dataset.answer === 'correct') {
                // logic: Update the variable, then update storage and display
                currentPoints += 1; 
                savePoints(currentPoints);
                updateDisplay();
                
                if (answer.dataset.finish) {
                    wrongPopup.textContent = 'Finish!';
                    wrongPopup.classList.add('show');
                    wrongPopup.style.backgroundColor = '#4CAF50';
                    clearTimeout(popupTimer);
                    popupTimer = setTimeout(function() {
                        // Optional: Keep points on finish screen or clear them
                        window.location.href = '../../../index.html';
                    }, 2000);
                } else {
                    window.location.href = answer.dataset.next;
                }
            } else {
                wrongPopup.classList.add('show');
                clearTimeout(popupTimer);
                popupTimer = setTimeout(function() {
                    wrongPopup.classList.remove('show');
                }, 1800);
            }
        });
    });

    // Image Map Listeners
    if (levelImage.complete) {
        resizeImageMap();
    } else {
        levelImage.addEventListener('load', resizeImageMap);
    }
    window.addEventListener('resize', resizeImageMap);
}