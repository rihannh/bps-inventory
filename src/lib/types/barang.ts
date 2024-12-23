export type Barang = {
  id: string;
  kode_barang: string;
  nama: string;
  stok: number;
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
  id: string;
  tanggal: string;
  kode: string;
  nama: string;
  jenis: string;
  satuan: string;
  jumlah: number;
  ruangan: string;
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
}

