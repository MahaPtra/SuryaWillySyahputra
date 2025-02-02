document.addEventListener("DOMContentLoaded", function () {
    // Ambil iframe dan akses musik di dalamnya
    let iframe = document.querySelector("iframe");
    let audio;

    iframe.onload = function () {
        audio = iframe.contentWindow.document.getElementById("bg-music");

        // Pastikan musik auto-play saat pertama kali halaman dibuka
        let musicStatus = localStorage.getItem("musicStatus") || "playing";
        if (musicStatus === "playing") {
            audio.play();
        } else {
            audio.pause();
        }

        // Buat tombol Play/Pause
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
    };
});
