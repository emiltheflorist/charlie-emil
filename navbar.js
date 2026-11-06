
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar-placeholder");

    function installSiteExtras() {
        // Prevent duplicate widgets
        if (document.getElementById("site-extras")) return;

        const extras = document.createElement("div");
        extras.id = "site-extras";

        extras.innerHTML = `
            <!-- LITTLE COMPANION -->
            <div class="love-companion">
                <div class="companion-message" id="companion-message">
                    You're loved! ♡
                </div>

                <button
                    class="companion-button"
                    id="companion-button"
                    aria-label="Talk to our little companion"
                    title="Click me! ♡"
                >
                    💗
                </button>
            </div>

            <!-- MUSIC PLAYER -->
            <div class="love-music-player">
                <div class="music-cover">♡</div>

                <div class="music-info">
                    <strong id="music-title">Glue Song</strong>
                    <span id="music-artist">beabadoobee</span>
                    <span id="music-status">Our little soundtrack ♡</span>
                </div>

                <button
                    id="music-toggle"
                    class="music-toggle"
                    aria-label="Play music"
                >
                    ▶
                </button>

                <audio
                id="couple-music"
                preload="auto"
                src="https://emiltheflorist.github.io/charlie-emil/music/beabadoobee%20-%20Glue%20Song%20Lyrics.mp3"
                ></audio>
            </div>
        `;

        document.body.appendChild(extras);

        // COMPANION MESSAGES
        const messages = {
            en: [
                "You're loved! ♡",
                "Charlie + Emil = forever!",
                "Sending you a little hug!",
                "You found our little corner of the universe!",
                "Love lives here. ♡",
                "Don't forget to smile!"
            ],
            fr: [
                "Tu es aimé(e) ! ♡",
                "Charlie + Emil = pour toujours !",
                "Un petit câlin pour toi !",
                "Bienvenue dans notre petit univers !",
                "L'amour habite ici. ♡",
                "N'oublie pas de sourire !"
            ],
            zh: [
                "你值得被爱！♡",
                "Charlie + Emil = 永远！",
                "送你一个小拥抱！",
                "欢迎来到我们的小宇宙！",
                "这里充满了爱。♡",
                "别忘了微笑！"
            ],
            de: [
                "Du bist geliebt! ♡",
                "Charlie + Emil = für immer!",
                "Eine kleine Umarmung für dich!",
                "Willkommen in unserer kleinen Welt!",
                "Hier wohnt die Liebe. ♡",
                "Vergiss nicht zu lächeln!"
            ]
        };

        const labels = {
            en: {
                companion: "Click me! ♡",
                status: "Our little soundtrack ♡",
                play: "Play music",
                pause: "Pause music"
            },
            fr: {
                companion: "Clique sur moi ! ♡",
                status: "Notre petite musique ♡",
                play: "Écouter",
                pause: "Mettre en pause"
            },
            zh: {
                companion: "点击我！♡",
                status: "我们的小小音乐 ♡",
                play: "播放音乐",
                pause: "暂停音乐"
            },
            de: {
                companion: "Klick mich! ♡",
                status: "Unser kleiner Soundtrack ♡",
                play: "Musik abspielen",
                pause: "Musik pausieren"
            }
        };

        const companionButton =
            document.getElementById("companion-button");

        const companionMessage =
            document.getElementById("companion-message");

        const music = document.getElementById("couple-music");
        const musicToggle = document.getElementById("music-toggle");
        const musicStatus = document.getElementById("music-status");

        let currentMessage = -1;

        function getLanguage() {
            const language = window.currentLanguage || "en";
            return messages[language] ? language : "en";
        }

        function updateWidgetsLanguage() {
            const language = getLanguage();
            const words = labels[language];

            companionButton.title = words.companion;
            musicStatus.textContent = words.status;

            musicToggle.setAttribute(
                "aria-label",
                music.paused ? words.play : words.pause
            );
        }

        // COMPANION CLICK
        companionButton.addEventListener("click", function () {
            const language = getLanguage();
            const availableMessages = messages[language];

            let nextMessage;

            do {
                nextMessage = Math.floor(
                    Math.random() * availableMessages.length
                );
            } while (
                availableMessages.length > 1 &&
                nextMessage === currentMessage
            );

            currentMessage = nextMessage;

            companionMessage.textContent =
                availableMessages[currentMessage];

            companionMessage.classList.add("show");

            companionButton.classList.remove("bounce");
            void companionButton.offsetWidth;
            companionButton.classList.add("bounce");
        });

        // MUSIC PLAY / PAUSE
        musicToggle.addEventListener("click", async function () {
            if (music.paused) {
                try {
                    await music.play();
                } catch (error) {
                    console.error("Music playback error:", error);
                    musicStatus.textContent =
                        "Couldn't play the song. Check the music file ♡";
                }
            } else {
                music.pause();
            }

            updateMusicButton();
        });

        function updateMusicButton() {
            const language = getLanguage();
            const words = labels[language];

            musicToggle.textContent = music.paused ? "▶" : "Ⅱ";

            musicToggle.setAttribute(
                "aria-label",
                music.paused ? words.play : words.pause
            );
        }

        music.addEventListener("play", updateMusicButton);
        music.addEventListener("pause", updateMusicButton);

        music.addEventListener("ended", function () {
            music.currentTime = 0;
            updateMusicButton();
        });

        // LANGUAGE CHANGES
        document.addEventListener(
            "languageChanged",
            updateWidgetsLanguage
        );

        updateWidgetsLanguage();
        updateMusicButton();
    }

    // LOAD NAVIGATION
    if (!navbar) {
        installSiteExtras();
        return;
    }

    fetch("/charlie-emil/navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load navigation");
            }

            return response.text();
        })
        .then(html => {
            navbar.innerHTML = html;

            document.dispatchEvent(
                new Event("navbarLoaded")
            );

            installSiteExtras();
        })
        .catch(error => {
            console.error("Navigation error:", error);
            installSiteExtras();
        });
});
