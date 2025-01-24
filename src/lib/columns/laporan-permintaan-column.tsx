import {ColumnDef} from '@tanstack/react-table';
import {BarangPermintaan} from '@/lib/types/barang';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export const laporanPermintaanColumns = (
  selectedRows: number[],
  handleSelectAll: (checked: boolean) => void,
  handleSelectRow: (id: number) => void
): ColumnDef<BarangPermintaan>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getSelectedRowModel().rows.length === table.getFilteredRowModel().rows.length}
        onChange={(e) => handleSelectAll(e.target.checked)}
        className="cursor-pointer"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={selectedRows.includes(row.original.id_permintaan)}
        onChange={() => handleSelectRow(row.original.id_permintaan)}
        className="cursor-pointer"
      />
    ),
  },
  {
    header: 'No',
    cell: (row) => row.row.index + 1,
  },
  {
    accessorKey: 'nama_barang',
    header: 'Nama Barang',
  },
  {
    accessorKey: 'masuk',
    header: 'Jumlah Masuk',
  },
  {
    accessorKey: 'keluar',
    header: 'Jumlah Keluar',
  },
  {
    accessorKey: 'stok',
    header: 'Stok Akhir',
  },
  {
    header: 'Action',
    cell: (row) => {
      // const id = row.row.original.id_permintaan;
      // console.log(id);
      return (
        <Button className='bg-green-500'>
          <Printer />
        </Button>
      );
    },
  },
];
