import {ColumnDef} from '@tanstack/react-table';
import {Pencil, Trash2} from 'lucide-react';
import {Link} from 'react-router-dom';
import { RuanganType } from '@/lib/types/ruangan';

export const ruanganColumns: ColumnDef<RuanganType>[] = [
  {
    header: 'No',
    cell: (row) => row.row.index + 1,
  },
  {
    accessorKey: 'nama',
    header: 'Nama Ruangan',
  },
  {
    accessorKey: 'jabatan',
    header: 'Jabatan',
  },
  {
    accessorKey: 'pj',
    header: 'Penanggung Jawab',
  },
  {
    header: 'Action',
    cell: () => (
      <div className='flex space-x-3 justify-center items-center'>
        {/* <Link to={'/'} className='bg-green-500 p-1 rounded-md hover:bg-green-900/90'>
          <CirclePlus size={18} color='white' />
        </Link> */}
        <Link
          to={'/'}
          className='bg-yellow-500 p-1 rounded-md hover:bg-yellow-900/90'
        >
          <Pencil size={18} color='white' />
        </Link>
        {/* <Link to={'/'} className='bg-sky-500 p-1 rounded-md hover:bg-sky-900/90'>
          <Download size={18} color='white' />
        </Link> */}
        <Link
          to={'/'}
          className='bg-red-500 p-1 rounded-md hover:bg-red-900/90'
        >
          <Trash2 size={18} color='white' />
        </Link>
      </div>
    ),
  },
];
