# Portfolio Website Specification: Retro-Minimalist Interactive Portfolio

Anda adalah seorang Senior Frontend Developer dan UI/UX Designer ahli. Tugas Anda adalah membuat sebuah website portofolio pribadi yang **minimalis, interaktif, modern**, dengan estetika **Retro-Cyber / Dark Mode** menggunakan kombinasi warna Hitam (Dominan), Ungu Neon/Retro (Aksen), dan Putih (Teks/Kontras).

---

## 1. DESIGN SYSTEM & TOKENS

*   **Background:** Deep Black (`#0B0B0B` atau `#000000`)
*   **Primary Accent (Retro Purple):** `#A855F7` (Purple-500) atau `#8B5CF6` (Violet-500) dengan efek *neon glow*.
*   **Secondary Accent:** Pure White (`#FFFFFF`) untuk keterbacaan teks utama, dan Muted Gray (`#9CA3AF`) untuk sub-teks.
*   **Typography:** Kombinasi Font Monospace (untuk kesan retro/tech) dan Sans-Serif bersih (Inter atau Roboto) untuk keterbacaan konten.
*   **Interaktivitas:** Efek hover *glowing*, transisi smooth (ease-in-out), dan animasi micro-interactions pada tombol.

---

## 2. STRUCTURE & LAYOUT SECTIONS

### A. Header / Hero Section
*   **Greeting Utama:** Teks besar dengan animasi *typing effect* atau fade-in: 
    > "Welcome to my portfolio" (atau variasi: "Welcome to my digital space.")
*   **Sub-title:** `Frontend Developer` (Beri efek gradasi ungu ke putih atau animasi subtle underline).
*   **Tambahan Elemen:** 
    *   Deskripsi singkat 1 baris yang menarik: *"Crafting minimalist interfaces with functional retro aesthetics."*
    *   Status indicator kecil di pojok atas: `🟢 Available for new projects` atau `🚀 Exploring web technologies`.

### B. About Me Section
*   **Layout:** Grid 2 Kolom (Responsif: 1 kolom di mobile, 2 kolom di desktop).
*   **Kolom Kiri (Teks):**
    *   Judul: `## About Me` (dengan border-left ungu).
    *   Isi: Perkenalkan diri secara naratif yang santai tapi profesional.
        *   **Nama:** Idham Kholid Abidin
        *   **Status:** Mahasiswa Semester 2 Teknik Informatika (Informatics Engineering) di **Universitas Trunojoyo Madura**.
        *   Fokus pada eksplorasi logika, struktur data, dan keindahan antarmuka web.
*   **Kolom Kanan (Foto):**
    *   Tempatkan placeholder foto profil (`profile.jpg`) di sisi kanan.
    *   **Efek Foto:** Beri bingkai (border) berwarna ungu retro, efek *hover lift* (sedikit naik saat diarahkan kursor), atau efek *duotone* hitam-ungu yang berubah menjadi berwarna saat di-hover.

### C. Interactive Section: "The 3 Cities Navigation"
Bagian ini adalah menu navigasi interaktif utama yang dikemas unik seperti peta/pilihan **3 Kota Retro** (bisa berupa kartu interaktif 3D, gaya pixel-art, atau minimalis neon card). Setiap "kota" bisa diklik dan akan menampilkan datanya masing-masing:

1.  **City 1: "Project Downtown"**
    *   *Fungsi:* Mengarahkan/menampilkan section proyek. 
    *   *Data awal:* Berikan contoh *placeholder* proyek seperti "Multi Info Hub (Static Web)" agar layoutnya terlihat nyata.
2.  **City 2: "Academy Metropolis"**
    *   *Fungsi:* Menampilkan Riwayat Pendidikan dalam bentuk timeline vertikal yang rapi, berpusat pada pendidikan saat ini di Universitas Trunojoyo Madura.
3.  **City 3: "Tech Forge Labs"**
    *   *Fungsi:* Menampilkan Tech Stack saat ini.

> 📌 **Catatan Penting untuk Komponen Tech Stack:**
> Buat komponen Tech Stack ini **sangat modular** (berbasis Array/Object). Pisahkan datanya agar sangat mudah ditambah di kemudian hari tanpa harus mengutak-atik struktur HTML.
> *Tech stack awal yang harus dimasukkan:* **HTML, CSS, JavaScript, dan Python**. Tampilkan dalam bentuk *badge icon* minimalis dengan efek hover menyala ungu.

### D. Contact Me Section
*   **Fitur Interactive Comment:** Sediakan area interaktif berupa form komentar/pesan sederhana (Guestbook style) di mana pengunjung bisa mengetikkan nama dan pesan mereka secara langsung.
*   **Social Media Hub:** Sediakan tombol/ikon platform berikut yang bisa diklik untuk menghubungi saya:
    *   **TikTok**
    *   **GitHub**
    *   **Discord**
    *   **Instagram**
    *   *Efek:* Ikon harus bersih dan interaktif (ketika di-hover akan memancarkan cahaya ungu).

---

## 3. TECHNICAL & CODE REQUIREMENTS

*   **Clean Code:** Gunakan struktur HTML5 semantik atau komponen framework (React/Tailwind CSS) yang terorganisir dengan sangat baik.
*   **Modularitas:** Simpan daftar proyek, riwayat pendidikan, dan *tech stack* dalam variabel data/state terpisah di bagian atas file kode agar saya dapat dengan mudah melakukan *update* (menambah/menghapus *skill*) hanya dengan mengubah isi Array-nya.
*   **Responsiveness:** Wajib sepenuhnya *mobile-friendly* (tampilan menyesuaikan dengan sempurna dari layar HP hingga monitor desktop besar).

---

## 4. DO'S & DON'TS (Aturan Ketat Desain)

### ✅ LAKUKAN (DO'S)
*   **Gunakan CSS Grid dan Flexbox** untuk memastikan tata letak (layout) presisi, rapi, dan responsif.
*   **Pertahankan "Whitespace":** Berikan jarak (margin/padding) yang cukup antar elemen. Biarkan desain bernapas dan tidak terlihat sesak.
*   **Beri Feedback Visual:** Pastikan setiap elemen interaktif (tombol 3 Kota, icon sosmed, tombol submit komentar) memberikan respons visual yang memuaskan saat di-hover.

### ❌ JANGAN LAKUKAN (DON'TS)
*   **Jangan Gunakan Warna Ekstra:** Dilarang menggunakan warna dominan di luar palet (Hitam, Ungu Retro, Putih/Abu-abu). Jangan memasukkan warna mencolok lain kecuali untuk warna asli logo sosial media (itu pun opsional, lebih baik *monochrome*).
*   **Jangan Gunakan Animasi Berlebihan (Over-animate):** Dilarang menggunakan animasi yang berputar-putar, memantul-mantul ekstrim, atau yang berat di-render. Tetap elegan.
*   **Jangan Buat Teks Sulit Dibaca:** Jangan gunakan font ungu di atas latar belakang hitam untuk teks panjang/paragraf. Gunakan warna putih/abu-abu terang untuk *body text*.
*   **Jangan Hardcode Data:** Jangan menumpuk list *Tech Stack* atau *Project* secara kaku di dalam HTML. Buat agar dinamis/modular.