document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");

    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "bg-music";
        audio.src = "bg.mp3";
        audio.autoplay = true; // Auto-play tetap ditambahkan
        audio.loop = true;
        document.body.appendChild(audio);
    }

    let musicStatus = localStorage.getItem("musicStatus") || "playing";
    let lastPosition = localStorage.getItem("musicPosition") || 0;
    audio.currentTime = lastPosition;

    if (musicStatus === "playing") {
        audio.play();
    } else {
        audio.pause();
    }

    // Buat tombol dengan teks awal sesuai status musik
    const button = document.createElement("button");
    button.id = "musicButton";
    button.className = "fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:to-accent px-6 py-5 transition rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105";
    button.textContent = musicStatus === "playing" ? "Pause Music" : "Play Music";

    document.body.appendChild(button);

    button.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
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
                audio.play();
                button.textContent = "Pause Music";
            } else {
                audio.pause();
                button.textContent = "Play Music";
            }
        }
    });
});
