document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");

    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "bg-music";
        audio.src = "bg.mp3";
        audio.loop = true;
        audio.autoplay = true; // Paksa auto-play
        document.body.appendChild(audio);
    }

    let musicStatus = localStorage.getItem("musicStatus") || "playing";
    let lastPosition = localStorage.getItem("musicPosition") || 0;
    audio.currentTime = lastPosition;

    // **Gunakan Web Audio API agar autoplay tidak diblokir**
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let track = audioContext.createMediaElementSource(audio);
    track.connect(audioContext.destination);

    function tryPlayAudio() {
        audioContext.resume().then(() => {
            let playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Musik berhasil auto-play!");
                }).catch(() => {
                    console.log("Autoplay gagal, browser memblokir...");
                });
            }
        });
    }

    if (musicStatus === "playing") {
        tryPlayAudio();
    } else {
        audio.pause();
    }

    // **Tombol awal harus "Pause Music" karena musik auto-play**
    const button = document.createElement("button");
    button.id = "musicButton";
    button.className = "fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:to-accent px-6 py-5 transition rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105";
    button.textContent = "Pause Music"; // Teks awal langsung "Pause Music"

    document.body.appendChild(button);

    button.addEventListener("click", function () {
        if (audio.paused) {
            tryPlayAudio();
            localStorage.setItem("musicStatus", "playing");
            button.textContent = "Pause Music";
        } else {
            audio.pause();
            localStorage.setItem("musicStatus", "paused");
            button.textContent = "Play Music";
        }

        // Kirim event ke tab lain agar sinkron
        localStorage.setItem("musicEvent", Date.now());
    });

    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem("musicPosition", audio.currentTime);
        }
    }, 1000);

    // Sinkronisasi antar tab
    window.addEventListener("storage", function (event) {
        if (event.key === "musicStatus") {
            if (event.newValue === "playing") {
                tryPlayAudio();
                button.textContent = "Pause Music";
            } else {
                audio.pause();
                button.textContent = "Play Music";
            }
        }
    });

    // **Jaminan auto-play berhasil setelah halaman load**
    window.onload = function () {
        setTimeout(tryPlayAudio, 100); // Paksa autoplay setelah 100ms
    };
});
