# Pembaruan identitas dan halaman sekolah

## Yang diperbarui

- Logo sekolah asli digunakan di navbar dan footer. Foto gedung yang dikirim digunakan di hero dan profil.
- Warna utama memakai hijau yang lebih segar, krem terang, kuning, dan hijau muda. Footer memakai hijau gelap, dengan latar terang khusus pada logo.
- Beranda memiliki bagian Akreditasi A dan lencana visual. Lencana adalah desain ilustratif, bukan logo badan akreditasi atau salinan sertifikat.
- Ringkasan sambutan kepala sekolah, dengan foto dan nama H. Maman Syaifurahman, M.Pd., ditempatkan sebelum bagian berita.
- Menu Profil Sekolah tersedia di navbar desktop dan sidebar mobile, dengan alamat `/profil-sekolah`. Isinya meliputi visi, misi, program unggulan, sarana/prasarana, akreditasi, dan pendidik.
- Beranda menyorot sekolah/SPMB; carousel halaman berita hanya memuat berita terbit. Buletin memiliki filter dan detail gambar tersendiri.
- Carousel beranda juga mengambil berita dari API, agar berita yang sudah dihapus tidak tetap tampil dari daftar statis.
- Tombol Hubungi kami pada bagian bawah beranda dan halaman SPMB membuka WhatsApp dengan pesan yang diberikan.
- Footer: kontak WhatsApp, Instagram, YouTube, dan tempat TikTok di kiri; peta dan alamat di kanan dengan judul Kunjungi kami.

## Mengubah kontak dan materi

Semua tautan kontak berada di `src/lib/school.ts`.

Tautan TikTok @aldinreal telah diaktifkan sesuai tautan terbaru yang diberikan.

Logo: `public/brand/logo-sekolah.png`.
Foto gedung: `public/brand/gedung-sekolah.jpg`.
Lencana: `public/brand/akreditasi-a.svg`.
Sambutan: `src/components/headmaster-welcome.tsx`.
Profil: `src/routes/profil-sekolah.tsx`.
Warna global: `src/styles.css`.

Sambutan disajikan sebagai ringkasan, bukan kutipan lengkap atau ucapan baru yang diatasnamakan kepala sekolah. Materi profil juga diringkas dengan penyesuaian redaksi. Data tanggal SPMB pada template sebelumnya diarahkan untuk dikonfirmasi ke admin agar tidak dianggap sebagai jadwal resmi yang belum diverifikasi.

Data berita dan kegiatan yang sudah disimpan tetap dipertahankan. Pengelolaan melalui `/admin` kini memakai username dan password; baca PANDUAN_BULETIN_DAN_MEDIA.md untuk fitur terbaru. Profil, sambutan, kontak, dan lencana belum memiliki editor admin khusus; ubah pada file di atas.

## Sumber materi

- https://almujahidin.sch.id/ — akreditasi dan sambutan kepala sekolah.
- https://almujahidin.sch.id/profil-sekolah — visi, misi, program unggulan, sarana, dan tenaga pendidik.
- Logo serta foto gedung berasal dari file yang dikirim pengguna.

## Menjalankan

Jika membuka folder baru, jalankan `npm install --include=optional`, kemudian `npm run dev`. Gunakan `.env` dengan pengaturan password admin yang sudah tersedia pada proyek.
