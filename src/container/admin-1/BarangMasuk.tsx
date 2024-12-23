import { TransaksiTable } from '@/components/TransaksiTable';
import {Card} from '@/components/ui/card';
import { barangMasukColumns } from '@/lib/columns/barang-masuk-column';
import { dataBarangMasuk } from '@/lib/data/barang';

export default function BarangKeluar() {
  return (
    <Card className='p-6'>
      <h1
        className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
      >
        Data Barang Masuk
      </h1>
      <TransaksiTable columns={barangMasukColumns} data={dataBarangMasuk} />
    </Card>
  );
}
