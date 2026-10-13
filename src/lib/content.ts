import bookShelfAsset from "@/assets/imported/src-assets-book-shelf.jpg.asset.json";
const bookShelf = bookShelfAsset.url;
import courtyardAsset from "@/assets/imported/src-assets-courtyard.jpg.asset.json";
const courtyard = courtyardAsset.url;
import libraryTablesAsset from "@/assets/imported/src-assets-library-tables.jpg.asset.json";
const libraryTables = libraryTablesAsset.url;
import readingRoomAsset from "@/assets/imported/src-assets-reading-room.jpg.asset.json";
const readingRoom = readingRoomAsset.url;
import guru1Asset from "@/assets/imported/src-assets-guru-1.png.asset.json";
const guru1 = guru1Asset.url;
import guru2Asset from "@/assets/imported/src-assets-guru-2.jpg.asset.json";
const guru2 = guru2Asset.url;
import guru3Asset from "@/assets/imported/src-assets-guru-3.jpg.asset.json";
const guru3 = guru3Asset.url;
import guru4Asset from "@/assets/imported/src-assets-guru-4.jpg.asset.json";
const guru4 = guru4Asset.url;
import guru5Asset from "@/assets/imported/src-assets-guru-5.jpg.asset.json";
const guru5 = guru5Asset.url;
import guru6Asset from "@/assets/imported/src-assets-guru-6.jpg.asset.json";
const guru6 = guru6Asset.url;
import guru7Asset from "@/assets/imported/src-assets-guru-7.jpg.asset.json";
const guru7 = guru7Asset.url;
import guru8Asset from "@/assets/imported/src-assets-guru-8.jpg.asset.json";
const guru8 = guru8Asset.url;
import guru9Asset from "@/assets/imported/src-assets-guru-9.jpg.asset.json";
const guru9 = guru9Asset.url;
import guru10Asset from "@/assets/imported/src-assets-guru-10.jpg.asset.json";
const guru10 = guru10Asset.url;
import guru11Asset from "@/assets/imported/src-assets-guru-11.jpg.asset.json";
const guru11 = guru11Asset.url;
import guru12Asset from "@/assets/imported/src-assets-guru-12.jpg.asset.json";
const guru12 = guru12Asset.url;
import guru13Asset from "@/assets/imported/src-assets-guru-13.jpg.asset.json";
const guru13 = guru13Asset.url;
import guru14Asset from "@/assets/imported/src-assets-guru-14.jpg.asset.json";
const guru14 = guru14Asset.url;
import guru15Asset from "@/assets/imported/src-assets-guru-15.jpg.asset.json";
const guru15 = guru15Asset.url;
import guru16Asset from "@/assets/imported/src-assets-guru-16.jpg.asset.json";
const guru16 = guru16Asset.url;
import guru17Asset from "@/assets/imported/src-assets-guru-17.jpg.asset.json";
const guru17 = guru17Asset.url;

export const teachers = [
  { name: "H. Maman Syaifurahman, M.Pd.", role: "Kepala Sekolah", photo: guru1 },
  {
    name: "M. Fuad, SQ, M.Pd",
    role: "S2 Administrasi Pendidik Guru Aqidah Akhlak Guru Qur’an Hadits",
    photo: guru2,
  },
  {
    name: "Ruhiat, S.Pd",
    role: "S1 Pend. B. Inggris Sertifikat Pendidik Guru B. Inggris",
    photo: guru3,
  },
  { name: "Supriyadi M.Pd.", role: "S2 Pend.  IPS Sertifikat Pendidik Guru IPS", photo: guru4 },
  { name: "M. Khamaluddin S.Pd,", role: "S1 PJOK Guru PJOK", photo: guru5 },
  { name: "M. Sopian M.A.", role: "S2 Ulum Tasfir Guru B.Arab Guru Fiqih", photo: guru6 },
  { name: "Divy Arnas, S.H", role: "S1 Syariah Guru PJOK Guru Prakarya", photo: guru7 },
  {
    name: "Fauzy Nurcholis Y S.Pd",
    role: "S1 Pend. Fisika Sertifikat Pendidik Guru IPA Guru Informatika Sahabat Teknologi Banten",
    photo: guru8,
  },
  {
    name: "Arindha Fitriasari S.Pd,",
    role: "S1 Pend. B. Indonesia Sertifikat Pendidik Guru B. Indonesia",
    photo: guru9,
  },
  {
    name: "Tien Wahyu E., M.Pd.",
    role: "S2 Pend. MIPA Sertifikat Pendidik Guru Matematika",
    photo: guru10,
  },
  {
    name: "Nuris Fakhma Hanana, M.Psi",
    role: "S2 Psikologi Guru Bimbingan Konseling",
    photo: guru11,
  },
  { name: "Wulandari, M.Pd.", role: "S2 PKn / Pendidikan IPS Guru PPK", photo: guru12 },
  { name: "Muhidin", role: "SMK Staff", photo: guru13 },
  { name: "Andi supandi", role: "SMA Staff", photo: guru14 },
  { name: "Drs. H. zamroni", role: "S1 Humas Kepala TU", photo: guru15 },
  { name: "Sylva Iman Niah", role: "SMK Staff TU", photo: guru16 },
  { name: "Eka Aprilianty", role: "S1 Manajemen Staff TU", photo: guru17 },
];

export type NewsItem = {
  type?: "news" | "bulletin";
  publisher?: string;
  pinned?: boolean;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const news: NewsItem[] = [
  {
    slug: "juara-lomba-debat-nasional",
    title: "Tim Debat SMP Islam Al-Mujahidin Pamulang Juara 1 Lomba Debat Nasional",
    date: "2 Oktober 2026",
    category: "Prestasi",
    excerpt:
      "Tiga siswa kelas IX membawa pulang piala setelah mengalahkan 48 sekolah dari seluruh Indonesia.",
    image: libraryTables,
    body: [
      "Tim debat Aldergrove berhasil meraih juara pertama dalam Lomba Debat Nasional tingkat SMA yang diselenggarakan di Jakarta pekan lalu.",
      "Ketiga siswa telah berlatih setiap sore selama empat bulan bersama pembina mereka, membahas topik mulai dari kebijakan energi hingga pendidikan digital.",
      "Kepala sekolah menyampaikan rasa bangga dan berharap prestasi ini menginspirasi seluruh siswa untuk terus berlatih berpikir kritis dan berbicara dengan santun.",
    ],
  },
  {
    slug: "perpustakaan-baru-dibuka",
    title: "Ruang Baca Baru Resmi Dibuka untuk Siswa",
    date: "24 September 2026",
    category: "Fasilitas",
    excerpt:
      "Ruang baca dengan lebih dari 5.000 koleksi buku kini buka hingga pukul 19.00 setiap hari sekolah.",
    image: readingRoom,
    body: [
      "Setelah renovasi selama enam bulan, ruang baca baru Aldergrove resmi dibuka dan siap digunakan oleh seluruh siswa.",
      "Ruangan ini dilengkapi meja kayu panjang, pencahayaan alami, serta area diskusi kecil untuk kerja kelompok.",
      "Siswa dapat meminjam hingga lima buku sekaligus dan mengikuti klub membaca setiap Kamis sore.",
    ],
  },
  {
    slug: "pekan-seni-dan-budaya",
    title: "Pekan Seni dan Budaya 2026 Meriah",
    date: "15 September 2026",
    category: "Kegiatan",
    excerpt:
      "Pertunjukan musik, pameran karya, dan tari tradisional memeriahkan halaman sekolah selama lima hari.",
    image: courtyard,
    body: [
      "Pekan Seni dan Budaya tahun ini menampilkan lebih dari 200 siswa dalam berbagai pertunjukan dan pameran.",
      "Acara dibuka dengan tari tradisional dan ditutup dengan konser orkestra sekolah di halaman utama.",
      "Orang tua dan alumni turut hadir menikmati karya siswa dan bazar makanan di sepanjang lorong sekolah.",
    ],
  },
  {
    slug: "donasi-buku-untuk-desa",
    title: "OSIS Kumpulkan 1.200 Buku untuk Perpustakaan Desa",
    date: "5 September 2026",
    category: "Sosial",
    excerpt:
      "Program donasi buku OSIS berhasil mengirimkan buku ke tiga perpustakaan desa di sekitar sekolah.",
    image: bookShelf,
    body: [
      "Selama sebulan, OSIS mengajak siswa, guru, dan orang tua untuk menyumbangkan buku layak baca.",
      "Hasilnya, 1.200 buku berhasil dikumpulkan dan diserahkan langsung oleh perwakilan siswa ke tiga desa.",
    ],
  },
];
