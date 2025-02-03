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

    // Ambil status musik & posisi terakhir dari localStorage
    let musicStatus = localStorage.getItem("musicStatus");
    let lastPosition = localStorage.getItem("musicPosition") || 0;

    // Set posisi terakhir sebelum dimainkan
    audio.currentTime = lastPosition;

    // Jika musik terakhir dalam keadaan "playing", lanjutkan
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
            localStorage.setItem("musicStatus", "playing");
            button.textContent = "Pause Music";
        } else {
            audio.pause();
            localStorage.setItem("musicStatus", "paused");
            button.textContent = "Play Music";
        }
    });

    // Simpan posisi lagu setiap 1 detik agar tidak mengulang dari awal saat pindah halaman
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem("musicPosition", audio.currentTime);
        }
    }, 1000);

    // Pastikan musik tetap berjalan saat user kembali ke tab
    window.addEventListener("focus", function () {
        let musicStatus = localStorage.getItem("musicStatus");
        if (musicStatus === "playing") {
            audio.play();
            button.textContent = "Pause Music";
        }
    });

    // Reset musik saat user benar-benar keluar dari browser
    window.addEventListener("beforeunload", function () {
        localStorage.removeItem("musicStatus"); // Reset status agar musik mulai dari awal saat reload penuh
        localStorage.removeItem("musicPosition"); // Reset posisi musik
    });
});
