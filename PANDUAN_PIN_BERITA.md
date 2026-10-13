# Pin berita dan carousel

## Mengepin berita

1. Masuk ke `/admin` dengan username dan password.
2. Buka **Berita & Buletin**.
3. Pada berita berstatus **Terbit**, tekan tombol ikon pin.
4. Tombol berubah menjadi hijau dan dapat ditekan kembali untuk melepas pin.

Hanya Berita yang sudah terbit dapat dipin. Tombol dinonaktifkan untuk draf; Buletin tidak memiliki tombol pin. Pin disimpan di server dan tetap ada setelah server dimulai ulang. Mengedit berita tetap mempertahankan pin; mengubahnya menjadi draf atau buletin otomatis melepas pin. Menghapus berita juga menghilangkannya dari carousel.

## Carousel beranda

Berita yang dipin tampil di awal carousel, diurutkan dari tanggal publish terbaru. Slide profil sekolah dan informasi SPMB tetap tersedia sesudahnya. Jika belum ada pin, carousel menampilkan slide profil sekolah dan SPMB.

## Carousel halaman berita

Carousel `/berita` memuat maksimal **lima berita terbit terbaru**, berdasarkan tanggal publish, bukan waktu pin atau waktu edit. Mendukung tanggal ISO seperti `2026-10-13` dan format Indonesia seperti `13 Oktober 2026`. Jika tanggal sama, mengikuti urutan daftar server. Buletin tidak masuk carousel, tetapi tetap dapat dibuka pada daftar/filter Buletin.

## Lingkungan sekolah

Bagian beranda memakai dua panel terpisah seperti jadwal kegiatan: informasi dan nomor slide di kiri, foto lengkap dan keterangan di kanan. Ada tombol sebelumnya/berikutnya, putar/jeda, serta perbesar foto. Panel disusun vertikal pada layar kecil. Carousel berhenti sementara ketika foto diperbesar dan tetap menghormati reduced motion.

## File utama

- `src/components/campus-carousel.tsx`: panel lingkungan sekolah.
- `src/components/school-carousel.tsx`: carousel beranda/berita.
- `src/lib/news-selection.ts`: pemilihan pin dan pengurutan tanggal.
- `src/routes/admin.tsx`: tombol pin/lepas pin.
- `scripts/news-api.mjs`: validasi dan penyimpanan pin, endpoint PATCH `/api/news`.

Tes tambahan (Node.js 24, atau gunakan flag `--experimental-strip-types` pada versi Node yang memerlukannya):

```sh
node scripts/test-news-pins.mjs
```
