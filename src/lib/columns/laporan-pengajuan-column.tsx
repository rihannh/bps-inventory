import {ColumnDef} from '@tanstack/react-table';
import {BarangPengajuan} from '@/lib/types/barang';
import {Badge} from '@/components/ui/badge';
import { ro } from 'date-fns/locale';

export const laporanPengajuanColumns: ColumnDef<BarangPengajuan>[] = [
  {
    header: 'No',
    cell: (row) => row.row.index + 1,
  },
  {
    accessorKey: 'tanggal',
    header: 'Tanggal Peengajuan',
    cell: '2021-08-01 (dummy)',
  },
  {
    accessorKey: 'kd_barang',
    header: 'Kode Barang',
  },
  {
    accessorKey: 'nama_barang',
    header: 'Nama Barang',
  },
  {
    accessorKey: 'kategori',
    header: 'Jenis Barang',
  },
  {
    accessorKey: 'satuan',
    header: 'Satuan',
  },
  {
    accessorKey: 'jumlah',
    header: 'Jumlah',
  },
  {
    accessorKey: 'harga_satuan',
    header: 'Harga Satuan',
    cell: (row) => {
      const number = row.row.original.harga_satuan;
      const formattedNumber = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
      return formattedNumber;
    }
  },
  {
    accessorKey: 'harga_pengajuan',
    header: 'Harga Pengajuan',
    cell: 'Rp.15.000 (dummy)',

  },
  {
    accessorKey: 'total_harga',
    header: 'Harga Total',
    cell: (row) => {
      const number = row.row.original.total_harga;
      const formattedNumber = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
      return formattedNumber;
    }
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
