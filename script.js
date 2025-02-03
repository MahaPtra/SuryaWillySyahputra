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

    // Ambil status musik dari sessionStorage (bukan localStorage, agar hanya untuk satu sesi/tab)
    let musicStatus = sessionStorage.getItem("musicStatus");

    // Jika user belum pernah klik play/pause, set status default ke 'paused'
    if (musicStatus === null) {
        sessionStorage.setItem("musicStatus", "paused");
        musicStatus = "paused";
    }

    // Jika musik terakhir diputar, lanjutkan saat kembali ke tab
    if (musicStatus === "playing") {
        audio.play().catch(() => {
            console.log("Autoplay diblokir, menunggu interaksi user");
        });
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
            sessionStorage.setItem("musicStatus", "playing");
            button.textContent = "Pause Music";
        } else {
            audio.pause();
            sessionStorage.setItem("musicStatus", "paused");
            button.textContent = "Play Music";
        }
    });

    // Pastikan musik tetap berjalan saat user kembali ke tab
    window.addEventListener("focus", function () {
        let musicStatus = sessionStorage.getItem("musicStatus");
        if (musicStatus === "playing") {
            audio.play();
            button.textContent = "Pause Music";
        }
    });

    // Reset musik saat user keluar dan kembali lagi
    window.addEventListener("beforeunload", function () {
        sessionStorage.removeItem("musicStatus"); // Reset status agar musik mulai dari awal saat reload
    });
});
