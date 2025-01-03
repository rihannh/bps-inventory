import {ColumnDef} from '@tanstack/react-table';
import {SummaryPengajuan} from '@/lib/types/barang';
import {Eye} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import DetailPengajuan from '@/container/operator-ruangan/DetailPengajuan';

export const summaryPengajuanOperatorColumns: ColumnDef<SummaryPengajuan>[] = [
  {
    header: 'No',
    cell: (row) => row.row.index + 1,
  },
  {
    accessorKey: 'tanggal_pengajuan',
    header: 'Tanggal Pengajuan',
  },
  {
    accessorKey: 'Jenis Barang',
    header: 'Jumlah pengajuan',
  },
  {
    header: 'Action',
    cell: () => (
      <Dialog>
        <div className='flex space-x-3 justify-center items-center'>
          {/* <Link to={'/'} className='bg-green-500 p-1 rounded-md hover:bg-green-900/90'>
          <CirclePlus size={18} color='white' />
        </Link> */}
          <DialogTrigger className='bg-green-500 p-1 rounded-md hover:bg-yellow-900/90'>
            <Eye size={18} color='white' />
          </DialogTrigger>
          <DialogContent className='max-w-[70%]'>
            <DialogHeader className='text-2xl font-semibold'>Detail Pengajuan</DialogHeader>
            <DetailPengajuan />
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
