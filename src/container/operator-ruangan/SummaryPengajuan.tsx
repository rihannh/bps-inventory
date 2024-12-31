import { TransaksiTable } from '@/components/TransaksiTable';
import {Card} from '@/components/ui/card';
import { summaryPengajuanOperatorColumns } from '@/lib/columns/summary-pengajuan-operator-column';
import { dataSummaryPengajuan } from '@/lib/data/barang';

export default function SummaryPengajuan() {
  return (
    <Card className='p-6'>
      <h1
        className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
      >
        Data Pengajuan Barang
      </h1>
      <TransaksiTable columns={summaryPengajuanOperatorColumns} data={dataSummaryPengajuan} />
    </Card>
  );
}
