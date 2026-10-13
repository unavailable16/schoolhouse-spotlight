# Dashboard Berita Sekolah

Dashboard berada di `/admin`. Tidak ada tombol login di navigasi publik. Admin membuka alamat tersebut langsung, lalu memasukkan username dan password yang ditentukan pengelola server.

## Menjalankan di komputer

1. Instal Node.js 22.16 atau lebih baru.
2. Buka terminal di folder proyek, lalu jalankan `npm install`.
3. Atur `ADMIN_USERNAME=admin` dan tambahkan `ADMIN_PASSWORD=password-panjang-pilihan-anda` ke file `.env`. Contoh pengaturan ada di `.env.admin.example`. Jangan memakai awalan `VITE_` untuk password.
4. Jalankan `npm run dev`. Perintah ini menjalankan website dan API berita bersama-sama.
5. Buka alamat website yang muncul di terminal, tambahkan `/admin`, lalu login.

Tidak ada password bawaan. Login akan menampilkan pesan konfigurasi bila password belum diatur. Sesi berlangsung 8 jam dan berakhir jika API dimulai ulang. Percobaan login dibatasi 10 kali per alamat IP dalam 15 menit.

## Mengelola berita

- Tambah berita: isi judul, slug, kategori, tanggal, ringkasan, isi, dan unggah foto.
- Foto: JPG, PNG, atau WebP, maksimal 3 MB.
- Pilih Draf untuk menyimpan tanpa menampilkan kepada pengunjung; pilih Terbit untuk menampilkan di beranda, daftar berita, dan detail berita.
- Edit lewat tombol pensil. Slug sebaiknya dipertahankan agar tautan lama tetap berlaku.
- Hapus lewat tombol tempat sampah, lalu konfirmasi.
- Cari berita berdasarkan judul/kategori dan filter berdasarkan status.

Empat berita contoh dimasukkan ke penyimpanan server saat admin pertama kali masuk. Setelah itu, daftar server menjadi sumber utama, termasuk ketika semua berita sudah dihapus. Data tersimpan di `data/news.json`; foto yang diunggah tersimpan bersama data dalam format base64. Cadangkan folder `data`.

## Hosting

API ini memakai Node.js dan penyimpanan disk permanen. API berjalan terpisah dengan `npm run api`; arahkan `/api/*` pada domain website yang sama ke port API (default 3001) melalui reverse proxy. Atur `ADMIN_PASSWORD`, `SITE_ORIGIN` (alamat HTTPS website), `NODE_ENV=production`, dan `NEWS_DATA_DIR` ke direktori permanen. Cookie produksi menggunakan Secure dan membutuhkan HTTPS.

Build frontend tetap mengikuti konfigurasi Lovable/TanStack yang ada. Hosting frontend saja tidak menjalankan API. Cloudflare Worker atau hosting tanpa disk permanen membutuhkan adaptasi penyimpanan (misalnya database dan penyimpanan objek) sebelum fitur admin dapat dipakai di sana. Implementasi file ini ditujukan untuk satu proses API; jangan menjalankan beberapa replika yang menulis file yang sama. Untuk penggunaan lebih besar, pindahkan data dan gambar ke database serta penyimpanan objek, dan tambahkan pembatasan percobaan login di reverse proxy.

## File utama yang berubah

- `src/routes/admin.tsx`: login, dashboard, formulir, unggah foto, pencarian, filter, konfirmasi hapus.
- `scripts/news-api.mjs`: API, autentikasi cookie, validasi, dan penyimpanan server.
- `scripts/dev.mjs`: menjalankan frontend dan API bersama.
- `src/lib/news-api.ts` dan `src/hooks/use-news.ts`: akses berita dari API.
- `src/routes/index.tsx`, `berita.index.tsx`, `berita.$slug.tsx`: menampilkan berita server.
- `vite.config.ts`: proxy API untuk pengembangan lokal.
