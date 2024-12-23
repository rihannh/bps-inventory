import {ColumnDef} from '@tanstack/react-table';
import {BarangPermintaan} from '@/lib/types/barang';
import {Badge} from '@/components/ui/badge';

export const laporanPermintaanColumns: ColumnDef<BarangPermintaan>[] = [
  {
    header: 'No',
    cell: (row) => row.row.index + 1,
  },
  {
    accessorKey: 'tanggal',
    header: 'Tanggal Permintaan',
  },
  {
    accessorKey: 'kode',
    header: 'Kode Barang',
  },
  {
    accessorKey: 'nama',
    header: 'Nama Barang',
  },
  {
    accessorKey: 'jenis',
    header: 'Jenis Barang',
  },
  {
    accessorKey: 'satuan',
    header: 'Satuan',
  },
  {
    accessorKey: 'jumlah',
    header: 'Jumlah Permintaan',
  },
  {
    accessorKey: 'ruangan',
    header: 'Ruangan',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => {
      const status = row.row.original.status;
      return (
        <Badge variant={status as 'pending' | 'approved' | 'rejected'}>
          {status}
        </Badge>
      );
    },
  },
];
