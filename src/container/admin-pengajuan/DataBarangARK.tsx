import {Card} from '@/components/ui/card';
import DataTable from '@/components/DataTable';
import {dataBarang} from '@/lib/data/barang';
import {barangViewColumns} from '@/lib/columns/barang-column-view';

export default function DataBarangARK() {
  return (
    <>
      <Card className='p-6'>
        <div className='flex flex-col lg:flex-row lg:justify-between'>
          <h1
            className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
          >
            Data Barang ARK
          </h1>
        </div>
        <DataTable data={dataBarang} columns={barangViewColumns} />
      </Card>
    </>
  );
}
