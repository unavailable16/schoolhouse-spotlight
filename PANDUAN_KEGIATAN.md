# Menu Kegiatan Sekolah

## Halaman publik

Menu **Kegiatan** tersedia pada navigasi desktop dan ponsel, dengan alamat `/kegiatan`.

1. **Jadwal sekolah:** carousel menampilkan jam, judul, dan keterangan; berpindah otomatis setiap 5 detik. Pengunjung dapat menggunakan tombol sebelumnya/berikutnya, indikator, atau tombol jeda. Gerak otomatis tidak diaktifkan untuk pengguna yang mengatur reduced motion.
2. **Poster jadwal:** gambar pertama yang dikirim dipasang di sebelah carousel. Klik untuk memperbesar. Di bawahnya, rangkaian jadwal lengkap dapat digeser ke samping.
3. **Intrakurikuler:** empat foto utuh yang terlihat pada referensi kedua ditampilkan sebagai kartu galeri, menggunakan area tampilan dari gambar sumber tanpa mengubah file aslinya. Setiap kartu dilengkapi judul dan penjelasan; klik untuk memperbesar.
4. **Ekstrakurikuler:** galeri tujuh program dari referensi ketiga, dengan pencarian dan filter kategori. Klik kartu untuk membuka halaman detail, misalnya `/kegiatan/futsal`.
5. **Detail ekskul:** nama, kategori, deskripsi, daftar kegiatan, hari dan waktu latihan, tempat, penanggung jawab, serta galeri foto dengan fitur perbesar.

Jadwal umum awal mengikuti poster sekolah yang dikirim. Nama program mengikuti referensi: Ratoeh Jaroe, Futsal, KIR, Paskibra, Tapak Suci, English Club, dan Pramuka.

Deskripsi program dan daftar aktivitas adalah contoh awal yang dapat disesuaikan dengan program sekolah. Hari latihan, jam khusus setiap ekskul, tempat, dan nama penanggung jawab belum tersedia dalam referensi sehingga dikosongkan. Halaman menampilkan “Belum diinformasikan” untuk kolom tersebut. Sampul awal memakai identitas program dari referensi; foto dokumentasi khusus setiap ekskul belum tersedia dan dapat diunggah melalui admin.

## Mengubah lewat dashboard

1. Jalankan proyek seperti biasa dengan `npm run dev`.
2. Buka `/admin`, masuk dengan password admin yang sudah ada.
3. Pilih menu **Kegiatan** di dashboard.
4. Pilih salah satu bagian berikut:
   - **Jadwal sekolah:** ganti poster, tambah/hapus jadwal, ubah jam, judul, dan keterangan. Gunakan panah untuk mengubah urutan.
   - **Intrakurikuler:** tambah/hapus kartu kegiatan, ubah judul dan deskripsi, unggah foto dan isi keterangannya.
   - **Ekstrakurikuler:** pilih atau tambah program, ubah informasi, isi jadwal/pembina, ganti sampul, lalu tambah foto galeri.
5. Klik **Simpan kegiatan**. Semua perubahan pada tiga bagian disimpan bersama dan tampil pada halaman publik.

Gambar JPG, PNG, atau WebP maksimal 1 MB per foto. Galeri setiap ekskul mendukung 8 foto. Total permintaan penyimpanan dibatasi 32 MB. Kompres foto sebelum diunggah bila terlalu besar.

Poster adalah gambar tetap, sedangkan carousel memakai data yang bisa diedit. Mengubah jam carousel tidak mengubah teks di poster. Unggah poster baru jika diperlukan agar keduanya tetap sesuai.

Perubahan yang belum disimpan akan hilang bila halaman dimuat ulang. Berpindah antara bagian atau antara menu Berita/Kegiatan dalam dashboard tetap mempertahankan isian selama halaman belum dimuat ulang.

## Data dan file

- `src/routes/kegiatan.index.tsx`: halaman Kegiatan.
- `src/routes/kegiatan.$slug.tsx`: detail program ekstrakurikuler.
- `src/components/schedule-carousel.tsx`: carousel jadwal.
- `src/components/activity-photo.tsx`: tampilan foto dan area foto dari referensi.
- `src/components/admin-activities.tsx`: formulir pengelolaan kegiatan.
- `src/lib/activities.ts`: tipe data dan akses API.
- `scripts/activities-store.mjs`: validasi dan penyimpanan kegiatan.
- `scripts/news-api.mjs`: menambahkan endpoint `/api/activities`, menggunakan sesi login admin yang sudah ada.
- `data/activities.seed.json`: konfigurasi awal, dipakai bila data kegiatan belum pernah disimpan.
- `data/activities.json`: dibuat setelah penyimpanan pertama oleh admin. Cadangkan bersama `data/news.json`.
- `public/kegiatan/`: tiga gambar referensi asli.

Data disimpan di server, sehingga perubahan juga terlihat oleh pengunjung lain. Penyimpanan memakai direktori `NEWS_DATA_DIR` yang sudah ada; bila tidak diatur, menggunakan folder `data`. Tidak memerlukan database atau instalasi paket baru. Pengaturan hosting Node.js dari panduan admin sebelumnya tetap berlaku.

## Pemeriksaan

```sh
npm run build
npx tsc --noEmit
node scripts/test-activities-api.mjs
node scripts/test-news-api.mjs
```

Untuk memasang dependensi pertama kali di Windows, jalankan `npm install --include=optional`. Jika paket native Rolldown tidak ditemukan, hapus `node_modules` dan `package-lock.json`, kemudian jalankan perintah instalasi tersebut kembali.

## Navigasi pada layar kecil

Pada lebar layar di bawah 1024 piksel, navbar memakai tombol menu yang membuka sidebar dari kanan. Sidebar juga dapat dibuka dengan geser dari 32 piksel terluar di tepi kanan ke kiri. Geser ke kanan untuk menutup, atau gunakan tombol X, klik area luar, atau tekan Escape. Menu menutup setelah tautan dipilih dan ketika ukuran layar kembali menjadi desktop. Gestur tepi layar dapat dipakai oleh browser atau sistem operasi tertentu; tombol menu tetap tersedia.
