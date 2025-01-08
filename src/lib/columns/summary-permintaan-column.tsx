import {ColumnDef} from '@tanstack/react-table';
import {SummaryPermintaan} from '@/lib/types/barang';
import {Eye, Printer} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import DetailPermintaan from '@/container/admin/DetailPermintaan';
import {Button} from '@/components/ui/button';
import {generateBlanko} from '../helper/generateBlanko';

export const summaryPermintaanColumns: ColumnDef<SummaryPermintaan>[] = [
  {
    header: 'No',
    cell: (row) => row.row.index + 1,
  },
  {
    accessorKey: 'tanggal',
    header: 'Tanggal',
  },
  {
    accessorKey: 'jumlah_permintaan',
    header: 'Jenis Barang',
  },
  {
    accessorKey: 'ruangan',
    header: 'Ruangan',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => {
      const status = {
        Approved: row.row.original.Approved,
        Pending: row.row.original.Pending,
        Rejected: row.row.original.Rejected,
      };
      return (
        <ul className='list-disc list-inside first:marker:text-green-500 [&:nth-child(2)]:marker:text-yellow-500 last:marker:text-red-500'>
          {Object.entries(status).map(([key, value]) => (
            <li key={key}>
              {key} : {value}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    header: 'Action',
    cell: (row) => {
      const hasPending = row.row.original.Pending > 0;
      const id_ruangan = row.row.original.id_ruangan;
      const tanggal = row.row.original.tanggal
      return (
        <Dialog>
          <div className='flex space-x-3 justify-center items-center'>
            <DialogTrigger className='bg-green-500 p-1 rounded-md hover:bg-yellow-900/90'>
              <Eye size={18} color='white' />
            </DialogTrigger>
            <DialogContent className='max-w-[70%]'>
              <DialogHeader className='text-2xl font-semibold'>
                Detail Pengajuan
              </DialogHeader>
              <DetailPermintaan ruanganID={id_ruangan} tanggal={tanggal} />
            </DialogContent>
            <Button
              disabled={hasPending}
              onClick={generateBlanko}
              className='p-1.5 h-fit'
            >
              <Printer size={18} />
            </Button>
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
      );
    },
  },
];
