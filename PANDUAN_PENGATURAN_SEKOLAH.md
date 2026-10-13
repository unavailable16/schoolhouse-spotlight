# Pengaturan SPMB dan Profil Sekolah

Masuk melalui `/admin` menggunakan username dan password yang sudah dikonfigurasi.

## Pengaturan SPMB

Menu ini mengatur tahun ajaran, judul dan deskripsi halaman, tombol WhatsApp, foto latar, gambar siswa, ornamen, persyaratan pendaftaran, serta tahapan penerimaan. Persyaratan dan tahapan dapat ditambah, diubah, atau dihapus. Info carousel SPMB di beranda memiliki judul, deskripsi, dan gambar tersendiri.

Klik **Simpan pengaturan** untuk menerapkan perubahan. Pamflet SPMB dapat dikelola langsung di bagian bawah menu ini; pamflet memiliki tombol simpan tersendiri. Pamflet tidak lagi tersedia di menu Media sekolah.

## Profil Sekolah

Tab **Profil & statistik** mengatur deskripsi, motto, visi, misi, akreditasi, statistik, tiga foto profil, serta informasi carousel profil di beranda. Foto profil tampil sebagai satu komposisi dengan tiga bingkai dan dapat diperbesar. Statistik yang disimpan tampil hanya di halaman profil; beranda tetap memuat sambutan kepala sekolah. Perubahan peringkat akreditasi juga memperbarui statistik akreditasi bawaan.

Tab **Lingkungan sekolah** mengatur slide lingkungan di beranda: masjid, gedung, ruang kelas, tata usaha, dan lab komputer. Slide bisa ditambah, dihapus, atau diubah. Ruang kelas, TU, dan lab komputer menggunakan ilustrasi sementara; unggah foto asli untuk menggantinya. Setelah foto diunggah, penanda ilustrasi dihapus.

Setiap tab disimpan secara terpisah. Simpan perubahan sebelum berpindah halaman atau menutup browser. Gambar unggahan menerima JPG, PNG, atau WebP maksimal 3 MB per gambar; kompres gambar jika total ukuran melebihi batas.

## Penyimpanan dan cadangan

Data tersimpan di `data/school-settings.json` atau direktori `NEWS_DATA_DIR` jika dikonfigurasi. Default awal tersedia dalam `src/lib/school-settings.defaults.json`. Sertakan direktori data dalam backup; jangan menghapusnya ketika memperbarui kode.

Pin berita tetap dikelola di menu Berita/Buletin. Carousel halaman berita tetap mengambil lima berita terbit terbaru. Pengaturan carousel SPMB dan profil hanya digunakan di beranda.

## Revisi 6b

Slider lingkungan sekolah dan jadwal kegiatan memakai animasi geser sesuai arah tombol: berikutnya dari kanan, sebelumnya dari kiri. Indikator jadwal juga mengikuti arah slide yang dipilih. Animasi dinonaktifkan jika perangkat meminta pengurangan gerakan.

## Revisi 6c

Bar informasi SPMB muncul di bawah navbar pada halaman publik. Tahun ajaran mengikuti Pengaturan SPMB. Tombol Lihat info SPMB membuka halaman SPMB; tombol X menutup bar dengan animasi ke atas. Setelah ditutup, bar tetap tertutup selama perpindahan halaman, lalu muncul kembali ketika website di-refresh atau dibuka ulang. Status penutupan tidak disimpan di browser.
