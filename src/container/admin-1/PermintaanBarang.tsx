import { TransaksiTable } from '@/components/TransaksiTable';
import {Card} from '@/components/ui/card';
import { barangPermintaanColumns } from '@/lib/columns/barang-permintaan-column';
import { dataBarangPermintaan } from '@/lib/data/barang';

export default function BarangKeluar() {
  return (
    <Card className='p-6'>
      <h1
        className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
      >
        Data Permintaan Barang
      </h1>
      <TransaksiTable columns={barangPermintaanColumns} data={dataBarangPermintaan} />
    </Card>
  );
}
