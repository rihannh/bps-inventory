import {ColumnDef} from '@tanstack/react-table';
import {BarangPermintaan} from '@/lib/types/barang';
import {Badge} from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

export const barangPermintaanColumns = (
  handleStatusChange: (id: string, newStatus: string) => void,
  statuses:Record<string,string>
): ColumnDef<BarangPermintaan>[] => [
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
    header: 'Jumlah',
  },
  {
    accessorKey: 'ruangan',
    header: 'Ruangan',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => {
      const status = statuses[row.row.original.id];
      return (
        <Badge variant={status as 'Pending' | 'Approved' | 'Rejected'}>
          {status}
        </Badge>
      );
    },
  },
  {
    header: 'Pilih Status',
    cell: (row) => (
      <Select
      value={statuses[row.row.original.id]}
      onValueChange={(newStatus)=>handleStatusChange(row.row.original.id, newStatus)}
      >
        <SelectTrigger>
          <SelectValue placeholder='Pilih Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Ubah Status</SelectLabel>
            <SelectItem value='Approved'>Approved</SelectItem>
            <SelectItem value='Rejected'>Rejected</SelectItem>
            <SelectItem value='Pending'>Pending</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
  },
];
