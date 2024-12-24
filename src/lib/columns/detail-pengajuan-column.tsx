import {ColumnDef} from '@tanstack/react-table';
import {BarangPengajuan} from '@/lib/types/barang';
import {Badge} from '@/components/ui/badge';

export const detailPengajuanColumns: ColumnDef<BarangPengajuan>[] = [
  {
    header: 'No',
    cell: (row) => row.row.index + 1,
  },
  {
    accessorKey: 'tanggal',
    header: 'Tanggal Pengajuan',
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
    header: 'Jumlah Pengajuan',
  },
  {
    accessorKey: 'harga_total',
    header: 'Total Harga',
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
        <Badge variant={status as 'Pending' | 'Approved' | 'Rejected'}>
          {status}
        </Badge>
      );
    },
  },
  
];
