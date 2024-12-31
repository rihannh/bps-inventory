import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import {barangPermintaanColumns} from '@/lib/columns/barang-permintaan-column';
import {dataBarangPermintaan} from '@/lib/data/barang';
import {useState} from 'react';

export default function DetailPermintaan() {
  const [statuses, setStatuses] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      dataBarangPermintaan.map((item) => [item.id, item.status])
    )
  );

  function handleStatusChange(id: string, value: string) {
    setStatuses((prev) => ({...prev, [id]: value}));
  }

  function submitForm(){
    console.log(statuses);
  }


  return (
    <>
      <DataTable
        columns={barangPermintaanColumns(handleStatusChange, statuses)}
        data={dataBarangPermintaan}
      />
      <Button className='w-fit px-8 ml-auto' onClick={submitForm}>Submit</Button>
    </>
  );
}
