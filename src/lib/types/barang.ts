export type Barang = {
  id_barang: string;
  kode_barang: string;
  nama: string;
  stok: number;
  stok_dasar: number;
  satuan: string;
  harga_satuan: number;
  harga_pengajuan: number;
};

export type BarangTrans = {
  id: string;
  tanggal: string;
  kode: string;
  nama: string;
  satuan: string;
  jumlah: number;
  ruangan: string;
};
export type BarangPermintaan = {
  id_permintaan: string;
  tanggal: string;
  kd_barang: string;
  nama_barang: string;
  kategori: string;
  satuan: string;
  jumlah: number;
  id_ruangan: string;
  status: string;
};

export type BarangPengajuan = {
  id: string;
  tanggal: string;
  kode: string;
  nama: string;
  jenis: string;
  satuan: string;
  jumlah: number;
  harga_satuan: number;
  harga_pengajuan: number;
  harga_total: number;
  status: string;
};

export type SummaryPermintaan = {
  id_user: number;
  id_ruangan: string;
  tanggal: string;
  ruangan: string;
  jumlah_permintaan: number;
  Approved: number;
  Pending: number;
  Rejected: number;
};
export type SummaryPengajuan = {
  id: number;
  tanggal_pengajuan: string;
  jumlah_pengajuan: number;
};



