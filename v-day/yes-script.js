```javascript
let musicPlaying = false;

window.addEventListener('load', () => {
    launchConfetti();

    // MUSIC
    const music = document.getElementById('bg-music');
    const musicButton = document.getElementById('music-toggle');

    if (music && musicButton) {
        music.volume = 0.3;

        music.play()
            .then(() => {
                musicPlaying = true;
                musicButton.textContent = '🔊';
            })
            .catch(() => {
                musicPlaying = false;
                musicButton.textContent = '🔇';
            });
    }
});

// =================================
// CONFETTI CELEBRATION
// =================================

function launchConfetti() {

    if (typeof confetti !== 'function') return;

    // VALENTINE COLORS
    const colors = [
        '#e6b94f',
        '#ffd76a',
        '#f4a7b9',
        '#e88ca5',
        '#fff4ce',
        '#ffffff'
    ];

    const duration = 6000;
    const end = Date.now() + duration;

    // INITIAL CELEBRATION
    confetti({
        particleCount: 150,
        spread: 110,
        startVelocity: 45,
        origin: {
            x: 0.5,
            y: 0.35
        },
        colors
    });

    // CONTINUOUS CONFETTI
    const interval = setInterval(() => {

        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        // LEFT SIDE
        confetti({
            particleCount: 25,
            angle: 60,
            spread: 60,
            origin: {
                x: 0,
                y: 0.65
            },
            colors
        });

        // RIGHT SIDE
        confetti({
            particleCount: 25,
            angle: 120,
            spread: 60,
            origin: {
                x: 1,
                y: 0.65
            },
            colors
        });

    }, 300);
}

// =================================
// MUSIC CONTROLS
// =================================

async function toggleMusic() {

    const music = document.getElementById('bg-music');
    const musicButton = document.getElementById('music-toggle');

    if (!music || !musicButton) return;

    try {

        if (musicPlaying) {
            music.pause();
            musicPlaying = false;
            musicButton.textContent = '🔇';

        } else {
            await music.play();
            musicPlaying = true;
            musicButton.textContent = '🔊';
        }

    } catch (error) {
        console.log('Music playback could not start:', error);
        musicPlaying = false;
        musicButton.textContent = '🔇';
    }
}
```
