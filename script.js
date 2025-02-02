document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");

    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "bg-music";
        audio.src = "bg.mp3";
        audio.autoplay = true;
        audio.loop = true;
        document.body.appendChild(audio);
    }

    let musicStatus = localStorage.getItem("musicStatus");
    let lastPosition = localStorage.getItem("musicPosition") || 0;
    audio.currentTime = lastPosition;

    if (musicStatus === null || musicStatus === "playing") {
        audio.play();
        localStorage.setItem("musicStatus", "playing");
    }

    // Buat tombol Play/Pause dengan teks awal "Play Music"
    const button = document.createElement("button");
    button.id = "musicButton";
    button.className = "fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:to-accent px-6 py-5 transition rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105";
    button.textContent = "Play Music"; // Teks awal

    document.body.appendChild(button);

    // Setelah auto-play, ubah teks button menjadi "Pause Music"
    setTimeout(() => {
        if (!audio.paused) {
            button.textContent = "Pause Music";
        }
    }, 100); // Ganti teks setelah musik mulai

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
    });

    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem("musicPosition", audio.currentTime);
        }
    }, 1000);

    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            let musicStatus = localStorage.getItem("musicStatus");
            if (musicStatus === "playing") {
                audio.play();
            } else {
                audio.pause();
            }
        }
    });
});
