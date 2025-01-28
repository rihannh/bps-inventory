import {base} from '../network/base';

export async function fetchDetailPermintaaan(
  ruangnaID: string,
  tanggal: string
) {
  const response = await base.get(
    `/get_detail_permintaan/${ruangnaID}/${tanggal}`
  );
  return response.data;
}

export async function fetchBarangMasuk(){
  const response = await base.get('/get_barang_masuk');
  return response.data;
}

export async function fetchAllBarang(){
  const response = await base.get('/get_barang_all');
  return response.data;
}

export async function fetchAllSumber(){
  const response = await base.get('/get_sumber');
  return response.data;
}

export async function fetchDataKarken(){
  const response = await base.post('/generate');
  console.log("karken",response.data);
  return response.data;
}

export async function fetchDataTableKarken(formatedValues){
  const response = await base.post('/summary_karken',formatedValues);
  console.log("table",response.data);
  return response.data;
}