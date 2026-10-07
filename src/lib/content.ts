import bookShelf from "@/assets/book-shelf.jpg";
import courtyard from "@/assets/courtyard.jpg";
import libraryTables from "@/assets/library-tables.jpg";
import readingRoom from "@/assets/reading-room.jpg";
import guru1 from "@/assets/guru-1.jpg";
import guru2 from "@/assets/guru-2.jpg";
import guru3 from "@/assets/guru-3.jpg";
import guru4 from "@/assets/guru-4.jpg";

export const teachers = [
  { name: "Drs. Bambang Sutrisno", role: "Kepala Sekolah", photo: guru1 },
  { name: "Siti Nurhaliza, S.Pd.", role: "Bahasa Indonesia", photo: guru2 },
  { name: "Andi Pratama, M.Si.", role: "Fisika", photo: guru3 },
  { name: "Dewi Lestari, S.Pd.", role: "Biologi", photo: guru4 },
];

export type NewsItem = {
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
    title: "Tim Debat Aldergrove Juara 1 Lomba Debat Nasional",
    date: "2 Oktober 2026",
    category: "Prestasi",
    excerpt: "Tiga siswa kelas XI membawa pulang piala setelah mengalahkan 48 sekolah dari seluruh Indonesia.",
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
    excerpt: "Ruang baca dengan lebih dari 5.000 koleksi buku kini buka hingga pukul 19.00 setiap hari sekolah.",
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
    excerpt: "Pertunjukan musik, pameran karya, dan tari tradisional memeriahkan halaman sekolah selama lima hari.",
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
    excerpt: "Program donasi buku OSIS berhasil mengirimkan buku ke tiga perpustakaan desa di sekitar sekolah.",
    image: bookShelf,
    body: [
      "Selama sebulan, OSIS mengajak siswa, guru, dan orang tua untuk menyumbangkan buku layak baca.",
      "Hasilnya, 1.200 buku berhasil dikumpulkan dan diserahkan langsung oleh perwakilan siswa ke tiga desa.",
    ],
  },
];
