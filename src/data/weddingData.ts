import coverImg from '../assets/images/cartoon_cover_floral_1795743752337.jpg';
import heroDanceImg from '../assets/images/cartoon_hero_dance_floral_1795743753198.jpg';
import brideImg from '../assets/images/cartoon_bride_anita_floral_1795743753427.jpg';
import groomImg from '../assets/images/cartoon_groom_olga_floral_1795743753417.jpg';
import floralStudioImg from '../assets/images/cartoon_floral_arch_couple_1795743754577.jpg';
import windowPampasImg from '../assets/images/cartoon_window_garden_couple_1795743754560.jpg';

export interface WeddingEvent {
  id: string;
  title: string;
  dayNumber: number;
  dayName: string;
  month: string;
  year: string;
  time: string;
  venueTitle: string;
  address: string;
  mapsUrl: string;
  image: string;
  sidebarSide: 'left' | 'right';
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  span: 'full' | 'half' | 'narrow' | 'wide';
  aspectClass: string;
}

export interface StoryChapter {
  id: string;
  date: string;
  title: string;
  narrative: string;
  image: string;
}

export interface WishReply {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface WishEntry {
  id: string;
  name: string;
  status: 'Hadir' | 'Masih Ragu' | 'Tidak Hadir';
  message: string;
  sticker?: string;
  dateLabel: string;
  relativeLabel: string;
  likes: number;
  likedByMe?: boolean;
  replies: WishReply[];
}

export const WEDDING_PHOTOS = {
  cover: coverImg,
  heroDance: heroDanceImg,
  bride: brideImg,
  groom: groomImg,
  floralStudio: floralStudioImg,
  windowPampas: windowPampasImg,
};

export const COUPLE_INFO = {
  hashtag: '#ALESHAnRAFItogether',
  dateDisplay: '31 . 12 . 2026',
  targetIsoDate: '2026-12-31T08:00:00+07:00',
  songTitle: 'Yovie & Nuno - Janji Suci',
  bride: {
    fullName: 'Alesha',
    shortName: 'Alesha',
    childOrder: 'Putri Pertama dari',
    parents: 'Bapak Adi Nugroho & Ibu Gani',
    instagramHandle: '',
    instagramUrl: '',
    photo: WEDDING_PHOTOS.bride,
  },
  groom: {
    fullName: 'Rafi',
    shortName: 'Rafi',
    childOrder: 'Putra Kedua dari',
    parents: 'Bapak Sufian Jamal & Ibu Elmira',
    instagramHandle: '',
    instagramUrl: '',
    photo: WEDDING_PHOTOS.groom,
  },
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'akad',
    title: 'Akad Nikah',
    dayNumber: 30,
    dayName: 'Rabu',
    month: 'Desember',
    year: '2026',
    time: '08.00 WIB',
    venueTitle: 'KEDIAMAN MEMPELAI WANITA',
    address: 'Tokyo, Jepang',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tokyo,+Jepang',
    image: WEDDING_PHOTOS.floralStudio,
    sidebarSide: 'left',
  },
  {
    id: 'resepsi',
    title: 'Resepsi',
    dayNumber: 30,
    dayName: 'Rabu',
    month: 'Desember',
    year: '2026',
    time: '09.00 - Selesai',
    venueTitle: 'KEDIAMAN MEMPELAI WANITA',
    address: 'Tokyo, Jepang',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tokyo,+Jepang',
    image: WEDDING_PHOTOS.cover,
    sidebarSide: 'right',
  },
  {
    id: 'ngunduh-mantu',
    title: 'Ngunduh Mantu',
    dayNumber: 31,
    dayName: 'Kamis',
    month: 'Desember',
    year: '2026',
    time: '17.00 WIB - Selesai',
    venueTitle: 'KEDIAMAN MEMPELAI PRIA',
    address: 'Tokyo, Jepang',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tokyo,+Jepang',
    image: WEDDING_PHOTOS.windowPampas,
    sidebarSide: 'left',
  },
];

export const DRESS_CODE_COLORS = [
  { name: 'Pearl Ivory', hex: '#F4F4F2' },
  { name: 'Soft Periwinkle', hex: '#B9B5D6' },
  { name: 'Warm Champagne', hex: '#DFC48C' },
  { name: 'Honey Gold', hex: '#CA9C4D' },
  { name: 'Muted Bronze', hex: '#9D8047' },
];

export const GIFT_ACCOUNTS = [
  {
    bank: 'BCA',
    accountNumber: 'Contoh',
    accountHolder: 'Alesha',
  },
  {
    bank: 'Mandiri',
    accountNumber: 'Contoh',
    accountHolder: 'Rafi',
  },
];

export const GIFT_SHIPPING = {
  recipient: 'Alesha & Rafi',
  phone: '',
  address: 'Tokyo, Jepang',
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    src: WEDDING_PHOTOS.floralStudio,
    alt: 'Ilustrasi kartun Alesha dan Rafi di bawah lengkung bunga taman',
    caption: 'Taman Bunga Cinta',
    span: 'full',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'g2',
    src: WEDDING_PHOTOS.bride,
    alt: 'Ilustrasi kartun pengantin wanita Alesha dengan buket bunga',
    caption: 'Alesha',
    span: 'half',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'g3',
    src: WEDDING_PHOTOS.groom,
    alt: 'Ilustrasi kartun pengantin pria Rafi di taman bunga',
    caption: 'Rafi',
    span: 'half',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'g4',
    src: WEDDING_PHOTOS.windowPampas,
    alt: 'Ilustrasi kartun Alesha dan Rafi bergandengan tangan di taman konservatori penuh bunga',
    caption: 'Janji Setia di Taman Kaca',
    span: 'full',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'g5',
    src: WEDDING_PHOTOS.cover,
    alt: 'Ilustrasi kartun Alesha dan Rafi berpose finger heart di taman mawar',
    caption: 'Potret Taman Mawar',
    span: 'half',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'g6',
    src: WEDDING_PHOTOS.heroDance,
    alt: 'Ilustrasi kartun Alesha dan Rafi berdansa di bawah wisteria dan mawar',
    caption: 'Dansa di Taman Wisteria',
    span: 'half',
    aspectClass: 'aspect-[3/4]',
  },
];

export const LOVE_STORY: StoryChapter[] = [
  {
    id: 'perkenalan',
    date: '15 FEBRUARI 2020',
    title: 'PERKENALAN',
    narrative:
      'Kami bertemu di tempat kerja. Pada saat itu, aku adalah karyawan yang ada di tempat magang dia. Akhirnya aku beranikan diri untuk menyatakan cinta padanya. Dari situlah hubungan kami dimulai.',
    image: WEDDING_PHOTOS.floralStudio,
  },
  {
    id: 'lamaran',
    date: '13 SEPTEMBER 2025',
    title: 'LAMARAN',
    narrative:
      'Setelah begitu banyak melewati proses dan rintangan dalam hubungan, akhirnya aku memutuskan untuk melamar dia pada tanggal 13 September 2025. Kami pun tidak menyangka bahwa cerita pertemuan ini menjadi penuh makna.',
    image: WEDDING_PHOTOS.windowPampas,
  },
  {
    id: 'pernikahan',
    date: '31 DESEMBER 2026',
    title: 'PERNIKAHAN',
    narrative:
      'Pada tanggal 31 Desember 2026, kami melangsungkan akad nikah & resepsi dengan sederhana dan penuh hikmat. Dengan semua doa restu dari keluarga dan teman-teman, aku dan pasangan telah siap untuk melangkah menuju babak baru kehidupan bersama.',
    image: WEDDING_PHOTOS.heroDance,
  },
];

export const TURUT_MENGUNDANG = [
  'Keluarga Besar Uzumaki (Naruto & Hinata)',
  'Keluarga Besar Namikaze (Minato & Kushina)',
  'Keluarga Besar Uchiha (Sasuke & Sakura)',
  'Keluarga Besar Nara (Shikamaru & Temari)',
  'Keluarga Besar Yamanaka (Ino & Sai)',
  'Keluarga Besar Hyuga (Hiashi & Hanabi)',
  'Keluarga Besar Hatake (Kakashi)',
  'Keluarga Besar Senju (Tsunade)',
  'Keluarga Besar Akimichi (Choji & Karui)',
  'Keluarga Besar Sarutobi (Konohamaru)',
  'Keluarga Besar Desa Konohagakure',
];

export const INITIAL_WISHES: WishEntry[] = [];

export const WEDDING_STICKERS = [
  { id: 's1', label: 'Selamat Menikah', icon: '💐' },
  { id: 's2', label: 'Sakinah Mawaddah', icon: '🤲' },
  { id: 's3', label: 'Cinta Abadi', icon: '💍' },
  { id: 's4', label: 'Bahagia Selalu', icon: '🕊️' },
];
