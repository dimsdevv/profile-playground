# profile-playground

Mini playground untuk profil GitHub — berisi game HTML5 sederhana yang bisa dideploy ke GitHub Pages.

Tujuan:
- Menampilkan contoh interaktif yang bisa di-embed sebagai link dari README profil.
- Membuat preview GIF/SVG animasi untuk digunakan di README utama.

Cara menjalankan lokal:
1. Buka `D:/Github Profile/profile-playground/index.html` di browser (double click atau `Live Server`).

Deploy ke GitHub Pages:
- Opsi 1 (direpo terpisah): buat repo `profile-playground` pada GitHub, push file, lalu aktifkan GitHub Pages pada branch `main` (folder root).
- Opsi 2 (jika ingin menyimpan di repo profile utama): gunakan GitHub Actions untuk publish folder `profile-playground` ke branch `gh-pages`.

Catatan:
- README utama profil GitHub tidak menjalankan JS — untuk pengalaman interaktif, host halaman (GitHub Pages / Vercel) dan tautkan dari README; sertakan preview GIF/SVG di README agar terlihat "hidup".

Teknologi: p5.js (CDN).