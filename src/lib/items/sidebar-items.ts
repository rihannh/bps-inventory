import {Home, Package, ScrollText, FileText} from 'lucide-react';

export const admin1Items = [
  {
    label: 'Data Master',
    icon: Package,
    contents: [
      {title: 'Data Admin', url: 'data-admin'},
      {title: 'Data Pegawai', url: 'data-pegawai'},
      {title: 'Data Admin Pengajuan', url: 'data-admin-pengajuan'},
      {title: 'Data Barang ATK', url: 'data-barang-atk'},
      {title: 'Data Barang ARK', url: 'data-barang-ark'},
      {title: 'Data Ruangan', url: 'data-ruangan'},
    ],
  },
  {
    label: 'Menu Transaksi',
    icon: ScrollText,
    contents: [
      {title: 'Barang Masuk', url: 'barang-masuk'},
      {title: 'Barang Keluar', url: 'barang-keluar'},
      {title: 'Permintaan Barang', url: 'permintaan-barang'},
    ],
  },
  {
    label: 'Menu Laporan',
    icon: FileText,
    contents: [
      {title: 'Laporan Pengajuan', url: 'laporan-pengajuan'},
      {title: 'Laporan Permintaan', url: 'laporan-permintaan'},
      {title: 'Laporan Stok', url: 'laporan-stok'},
    ],
  },
];
export const admin2Items = [
  {
    label: 'Data Master',
    icon: Home,
    contents: [
      {title: 'Data Admin', url: '#'},
      {title: 'Data Pegawai', url: '#'},
      {title: 'Data Admin Pengajuan', url: '#'},
      {title: 'Data Barang', url: '#'},
      {title: 'Data Ruangan', url: '#'},
    ],
  },
];
