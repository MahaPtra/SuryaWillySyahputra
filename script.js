document.addEventListener("DOMContentLoaded", function () {
    let iframe = document.getElementById("musicFrame");

    iframe.onload = function () {
        let iframeDoc = iframe.contentWindow.document;
        let audio = iframeDoc.getElementById("bg-music");

        // Cek status musik
        let musicStatus = localStorage.getItem("musicStatus") || "playing";
        if (musicStatus === "playing") {
            audio.play();
        } else {
            audio.pause();
        }

        // Pastikan hanya satu tombol kontrol musik
        let button = document.getElementById("musicButton");
        if (!button) {
            button = document.createElement("button");
            button.id = "musicButton";
            button.className = "fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:to-accent px-6 py-5 transition rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105";
            button.textContent = musicStatus === "playing" ? "Pause Music" : "Play Music";
            document.body.appendChild(button);
        }

        // Fungsi tombol play/pause
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
})
