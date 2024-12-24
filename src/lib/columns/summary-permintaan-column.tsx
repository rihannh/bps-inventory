import {ColumnDef} from '@tanstack/react-table';
import {SummaryPermintaan} from '@/lib/types/barang';
import {Eye} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import DetailPermintaan from '@/container/operator-ruangan/DetailPermintaan';

export const summaryPermintaanColumns: ColumnDef<SummaryPermintaan>[] = [
  {
    header: 'No',
    cell: (row) => row.row.index + 1,
  },
  {
    accessorKey: 'tanggal_permintaan',
    header: 'Tanggal Permintaan',
  },
  {
    accessorKey: 'jumlah_permintaan',
    header: 'Jumlah Perminataan',
  },
  {
    header: 'Action',
    cell: () => (
      <Dialog>
        <div className='flex space-x-3 justify-center items-center'>
          <DialogTrigger className='bg-green-500 p-1 rounded-md hover:bg-yellow-900/90'>
            <Eye size={18} color='white' />
          </DialogTrigger>
          <DialogContent className='max-w-[70%]'>
            <DialogHeader className='text-2xl font-semibold'>
              Detail Pengajuan
            </DialogHeader>
            <DetailPermintaan />
          </DialogContent>
          {/* <Link
          to={'detail'}
          className='bg-yellow-500 p-1 rounded-md hover:bg-yellow-900/90'
        >
          <Pencil size={18} color='white' />
        </Link> */}
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
