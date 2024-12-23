import {ColumnDef} from '@tanstack/react-table';
import {Pencil} from 'lucide-react';
import {BarangPengajuan} from '@/lib/types/barang';
import {Badge} from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import PermintaanEdit from '@/components/PermintaanEditForm';

export const barangPengajuanColumns: ColumnDef<BarangPengajuan>[] = [
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
  {
    header: 'Action',
    cell: () => (
      <Dialog>
        <div className='flex space-x-3 justify-center items-center'>
          {/* <Link to={'/'} className='bg-green-500 p-1 rounded-md hover:bg-green-900/90'>
          <CirclePlus size={18} color='white' />
        </Link> */}
          <DialogTrigger className='bg-yellow-500  h-fit p-1 rounded-md hover:bg-yellow-900/90'>
            <Pencil size={18} color='white' />
          </DialogTrigger>
          <DialogContent className='h-[80%] overflow-auto'>
            <DialogHeader className='text-xl font-semibold'>
              Edit Permintaan
            </DialogHeader>
            <PermintaanEdit />
          </DialogContent>
          {/* <Link to={'/'} className='bg-sky-500 p-1 rounded-md hover:bg-sky-900/90'>
          <Download size={18} color='white' />
        </Link> */}
          {/* <Link
          to={'/'}
          className='bg-red-500 p-1 rounded-md hover:bg-red-900/90'
        >
          <Trash2 size={18} color='white' />
        </Link> */}
        </div>
      </Dialog>
    ),
  },
];
