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
export type BarangTransaction = {
  id: string;
  tanggal: string;
  kode: string;
  nama: string;
  satuan: string;
  jumlah: number;
  ruangan: string;
  status: string;
};
