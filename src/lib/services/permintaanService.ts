import { base } from '@/lib/network/base';

export const fetchAllBarang = async () => {
  const response = await base.get('/barang');
  return response.data;
};

export const tambahPermintaan = async (data: any) => {
  const response = await base.post('/tambah_permintaan', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
