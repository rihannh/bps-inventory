import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { barangPengajuanColumns } from '@/lib/columns/barang-pengajuan-column';
import {dataBarangPengajuan, dataBarangPermintaan} from '@/lib/data/barang';
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
        columns={barangPengajuanColumns(handleStatusChange, statuses)}
        data={dataBarangPengajuan}
      />
      <Button className='w-fit px-8 ml-auto' onClick={submitForm}>Submit</Button>
    </>
  );
}
