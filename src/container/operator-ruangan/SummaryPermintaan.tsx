import { TransaksiTable } from '@/components/TransaksiTable';
import {Card} from '@/components/ui/card';
import { summaryPermintaanColumns } from '@/lib/columns/summary-permintaan-column';
import { dataSummaryPermintaan } from '@/lib/data/barang';

export default function SummaryPermintaan() {
  return (
    <Card className='p-6'>
      <h1
        className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
      >
        Data Permintaan Barang
      </h1>
      <TransaksiTable columns={summaryPermintaanColumns} data={dataSummaryPermintaan} />
    </Card>
  );
}
