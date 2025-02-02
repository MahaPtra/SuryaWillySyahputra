document.addEventListener("DOMContentLoaded", function () {
    // Cek apakah elemen audio sudah ada
    let audio = document.getElementById("bg-music");

    // Jika belum ada, buat audio baru
    if (!audio) {
        audio = document.createElement("audio");
        audio.id = "bg-music";
        audio.src = "bg.mp3";
        audio.autoplay = true;
        audio.loop = true;
        document.body.appendChild(audio);
    }

    // Cek status musik dari Local Storage
    let musicStatus = localStorage.getItem("musicStatus");
    let lastPosition = localStorage.getItem("musicPosition") || 0;

    // Set posisi terakhir sebelum dimainkan
    audio.currentTime = lastPosition;

    // **Musik akan auto play jika ini pertama kali user membuka halaman**
    if (musicStatus === null || musicStatus === "playing") {
        audio.play();
        localStorage.setItem("musicStatus", "playing"); // Simpan status playing di localStorage
    }

    // Buat tombol Play/Pause
    const button = document.createElement("button");
    button.id = "musicButton";
    button.className = "fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:to-accent px-6 py-5 transition rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105";
    button.textContent = audio.paused ? "Play Music" : "Pause Music";
    document.body.appendChild(button);

    // Event untuk tombol Play/Pause
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

    // Simpan posisi lagu setiap 1 detik agar tidak mengulang dari awal
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem("musicPosition", audio.currentTime);
        }
    }, 1000);

    // Pastikan musik tidak play otomatis jika sebelumnya dipause
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
