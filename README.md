# 🌐 Personal Portfolio — Idham Kholid Abidin

> A minimalist, interactive, and modern personal portfolio website with a **Retro-Cyber / Dark Mode** aesthetic.

---

## ✨ Preview

![Portfolio Preview](profile.jpg)

---

## 🚀 Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Design system, animations, responsive layout |
| **JavaScript (Vanilla)** | Interactivity, data rendering, localStorage |

> No frameworks, no dependencies — pure HTML/CSS/JS. Just open `index.html` and it works.

---

## 📁 Struktur Folder

```
Portofolio/
├── index.html      # Struktur utama (HTML5 semantik)
├── style.css       # Design system & semua styling
├── script.js       # Data arrays + logika interaktif
├── profile.jpg     # Foto profil
└── README.md       # Dokumentasi ini
```

---

## 🎨 Design System

Warna dan token desain didefinisikan sebagai **CSS Custom Properties** di bagian atas `style.css`:

```css
:root {
  --bg-primary:    #0B0B0B;   /* Background utama */
  --accent-purple: #A855F7;   /* Aksen neon ungu */
  --accent-violet: #8B5CF6;   /* Aksen violet */
  --text-primary:  #FFFFFF;   /* Teks utama */
  --text-muted:    #9CA3AF;   /* Sub-teks */
}
```

Untuk **retheme** seluruh website, cukup ubah nilai variabel di atas.

---

## ✏️ Cara Mengedit Konten

Semua data disimpan sebagai **array modular** di bagian atas `script.js`. Tidak perlu menyentuh HTML.

### Tambah / Edit Tech Stack

```js
// script.js
const TECH_STACK = [
  { name: 'HTML',       icon: '🌐', level: 'Proficient' },
  { name: 'CSS',        icon: '🎨', level: 'Proficient' },
  { name: 'JavaScript', icon: '⚡', level: 'Learning'   },
  { name: 'Python',     icon: '🐍', level: 'Learning'   },
  // ↓ Tambah baris baru di sini
  { name: 'React',      icon: '⚛️', level: 'Learning'   },
];
```

### Tambah / Edit Project

```js
// script.js
const PROJECTS = [
  {
    title: 'Nama Project',
    desc:  'Deskripsi singkat project.',
    tags:  ['HTML', 'CSS', 'JS'],
    link:  'https://github.com/username/repo', // kosongkan ('') jika belum ada link
  },
];
```

### Tambah / Edit Riwayat Pendidikan

```js
// script.js
const EDUCATION = [
  {
    year:   '2025 — Present',
    title:  'S1 Teknik Informatika',
    place:  'Universitas Trunojoyo Madura',
    detail: 'Keterangan tambahan.',
  },
];
```

---

## 🗂️ Sections

| Section | Deskripsi |
|---|---|
| **Hero** | Typing animation, status indicator, CTA buttons |
| **About Me** | Narasi diri, foto profil, interest tags |
| **3 Cities Navigation** | Panel interaktif: Projects / Education / Tech Stack |
| **Contact** | Guestbook (localStorage) + Social media links |

---

## 💬 Guestbook

Pesan dari pengunjung disimpan di **localStorage** browser — tidak memerlukan backend atau database. Data tetap ada selama pengunjung tidak menghapus cache browser-nya.

---

## 📱 Responsiveness

Website sepenuhnya **mobile-friendly**:
- Desktop (> 900px): Layout 2 kolom, 3 city cards sejajar
- Tablet (600–900px): Layout 1 kolom, foto profil terpusat
- Mobile (< 600px): Full single-column, navbar links disembunyikan

---

## 🔗 Social Media

| Platform | Link |
|---|---|
| GitHub | [github.com/dhamm-dev](https://github.com/dhamm-dev) |
| Instagram | [@dhamkholab](https://www.instagram.com/dhamkholab) |
| TikTok | [@xeeerz](https://www.tiktok.com/@xeeerz) |
| Discord | xieroooo |

---

## 📄 Lisensi

© 2026 Idham Kholid Abidin. All rights reserved.
