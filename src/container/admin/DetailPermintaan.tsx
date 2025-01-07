import DataTable from '@/components/DataTable';
import {Button} from '@/components/ui/button';
import {barangPermintaanColumns} from '@/lib/columns/barang-permintaan-column';
import {dataBarangPermintaan} from '@/lib/data/barang';
import {useState} from 'react';

export default function DetailPermintaan() {
  const [newData, setNewData] = useState(() =>
    dataBarangPermintaan.map((item) => ({
      id: item.id,
      jumlah: item.jumlah,
      status: item.status,
    }))
  );

  function handleDataChange(id: string, newJumlah: number | undefined, newStatus: string |undefined) {
    setNewData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              jumlah: newJumlah !== undefined ? newJumlah : item.jumlah,
              status: newStatus !== undefined ? newStatus : item.status,
            }
          : item
      )
    );
  }

  function submitForm() {
    console.log(newData);
  }

  return (
    <>
      <DataTable
        columns={barangPermintaanColumns(handleDataChange, newData)}
        data={dataBarangPermintaan}
        search_placeholder='barang'
        column_name='nama'
      />
      <Button className='w-fit px-8 ml-auto' onClick={submitForm}>
        Submit
      </Button>
    </>
  );
}
