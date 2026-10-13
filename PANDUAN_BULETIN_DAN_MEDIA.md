# Berita, buletin, dan media sekolah

## Login admin

Admin sekarang masuk dengan username dan password. Pada proyek ini, username awal adalah `admin`; password tetap memakai nilai `ADMIN_PASSWORD` yang sudah ada pada `.env`.

Untuk mengubah akun, atur:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password-pilihan-anda
```

Mulai ulang `npm run dev` setelah mengubah pengaturan. Jangan memakai awalan `VITE_` untuk kredensial. Implementasi ini memakai satu akun admin melalui pengaturan server; belum memiliki pengelolaan banyak akun.

Nama penerbit ditetapkan oleh server saat posting dibuat, sesuai username yang sedang login. Nilainya tidak dapat ditentukan atau dipalsukan melalui formulir. Mengedit posting mempertahankan penerbit awal dan mencatat username pengedit. Posting lama tanpa metadata penerbit ditampilkan sebagai “Admin sekolah”, karena identitas pembuat lamanya belum tersimpan.

## Berita dan buletin

Buka `/admin` → **Berita & Buletin** → **Tambah posting**.

- Pilih **Berita** untuk mengisi judul, slug, tanggal, kategori, ringkasan, isi, gambar, dan status Draf/Terbit.
- Pilih **Buletin** untuk mengisi judul, tanggal publish, dan gambar saja. Buletin langsung diterbitkan setelah disimpan; tanggal bukan penjadwalan otomatis. Slug dibuat otomatis dari judul.
- Jenis posting dapat diubah saat mengedit. Periksa kembali kolom isi/ringkasan bila mengubah buletin menjadi berita.
- Gambar JPG, PNG, atau WebP maksimal 3 MB.

Pada halaman `/berita`, pengunjung dapat memilih Semua, Berita, atau Buletin. Kartu dan detail menampilkan penerbit. Detail buletin mempertahankan gambar utuh dan menyediakan pembesaran melalui klik.

## Carousel

- Beranda: berita terbit yang dipin oleh admin tampil terlebih dahulu, diikuti slide profil sekolah dan SPMB. Tidak ada penambahan otomatis berdasarkan judul/kategori.
- Halaman berita: lima berita terbit terbaru berdasarkan tanggal publish, dari yang paling baru. Tidak dipengaruhi pin. Jika tersedia kurang dari lima berita, semua berita yang tersedia ditampilkan. Buletin tetap tersedia pada daftar dan filter Buletin.

## Pamflet SPMB dan gambar profil

Buka `/admin` → **Pengaturan SPMB** untuk pamflet, atau **Media sekolah** untuk foto program dan fasilitas.

- **Pamflet SPMB:** tambah judul dan gambar pamflet, lalu simpan. Mendukung sampai 12 gambar. Halaman SPMB menampilkannya secara horizontal; gambar bisa dipilih untuk diperbesar tanpa dipotong.
- **Program unggulan:** ganti gambar untuk Multimedia, Subuh Bersama, dan Tahfidz.
- **Sarana & prasarana:** ganti gambar untuk UKS, Kantin, dan Sarana olahraga.

File pamflet asli belum tersedia dari lampiran dan halaman referensi yang dapat dibaca. Galeri awal tetap kosong dan menampilkan informasi bahwa pamflet akan tersedia. Jangan memakai foto uji sebagai pamflet pada publikasi sebenarnya.

Gambar program dan fasilitas awal adalah ilustrasi yang diberi keterangan, bukan foto asli fasilitas sekolah. Unggah foto yang sesuai untuk menggantinya. Judul dan urutan tiga program/fasilitas tetap mengikuti profil sekolah. Format gambar JPG, PNG, atau WebP maksimal 3 MB; total permintaan penyimpanan maksimal 32 MB.

## Lingkungan sekolah dan footer

Beranda memiliki slider lingkungan: Masjid Al-Mujahidin Pamulang, gedung sekolah, ruang kelas, TU, dan lab komputer. Tiga slide ruang terakhir menggunakan ilustrasi sementara yang dapat diganti melalui Profil Sekolah → Lingkungan sekolah. Slider menampilkan keterangan, tombol sebelumnya/berikutnya, serta putar/jeda; otomatis berpindah setiap 6 detik dan menghormati preferensi reduced motion.

Footer memakai hijau gelap, tautan TikTok yang diberikan telah diaktifkan, dan email memiliki ikon. Kontak berada di `src/lib/school.ts`.

## Penyimpanan

- `data/news.json`: berita dan buletin.
- `data/site-media.json`: pamflet dan gambar profil, dibuat saat pertama kali disimpan.
- `data/activities.json`: data kegiatan yang sudah ada.

Cadangkan folder data. Jika `NEWS_DATA_DIR` diatur, file simpanan memakai direktori tersebut. Data yang sudah tersimpan tetap dipertahankan.

## Menjalankan

Jalankan `npm install --include=optional` jika membuka folder baru, lalu `npm run dev`. Buka `/admin` dengan username `admin` dan password yang ada pada `.env`.

Pemeriksaan:

```sh
npm run build
npx tsc --noEmit
node scripts/test-news-api.mjs
node scripts/test-activities-api.mjs
node scripts/test-posts-and-media.mjs
```
