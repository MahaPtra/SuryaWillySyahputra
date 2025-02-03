document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen audio
    let audio = document.getElementById("bg-music");

    // Jika belum ada, buat elemen audio baru
    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "bg-music";
        audio.src = "bg.mp3";
        audio.loop = true;
        document.body.appendChild(audio);
    }

    // Cek status musik di Local Storage
    let musicStatus = localStorage.getItem("musicStatus");

    // Jika user belum pernah klik play/pause, set status default ke 'paused'
    if (musicStatus === null) {
        localStorage.setItem("musicStatus", "paused");
        musicStatus = "paused";
    }

    // Jika musik terakhir diputar, lanjutkan
    if (musicStatus === "playing") {
        audio.play();
    }

    // Buat tombol Play/Pause
    const button = document.createElement("button");
    button.id = "musicButton";
    button.className = "fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg transition transform hover:scale-105";
    button.textContent = musicStatus === "playing" ? "Pause Music" : "Play Music";
    document.body.appendChild(button);

    // Event untuk Play/Pause musik
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

    // Pastikan musik tetap lanjut saat pindah tab, tapi tidak auto-play jika user pause
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            let musicStatus = localStorage.getItem("musicStatus");
            if (musicStatus === "playing") {
                audio.play();
                button.textContent = "Pause Music";
            } else {
                audio.pause();
                button.textContent = "Play Music";
            }
        }
    });

    // Reset musik saat user keluar dan kembali lagi
    window.addEventListener("beforeunload", function () {
        localStorage.removeItem("musicStatus"); // Hapus status agar reset saat reload
    });
});
