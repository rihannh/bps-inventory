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
import {Input} from '@/components/ui/input';

export const barangPermintaanColumns = (
  handleDataChange: (id: string, newJumlah: number | undefined, newStatus: string |undefined) => void,
  newData: {id: string; jumlah: number; status: string}[]
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
    cell: (row) => {
      const currentJumlah = newData.find(
        (item) => item.id === row.row.original.id
      )?.jumlah;      return (
        <Input
          type='number'
          defaultValue={currentJumlah}
          onBlur={(e) =>
            handleDataChange(
              row.row.original.id,
              Number(e.target.value),
              undefined 
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'ruangan',
    header: 'Ruangan',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => {
      const status = newData.find(
        (item) => item.id === row.row.original.id
      )?.status;
      return (
        <Badge variant={status as 'Pending' | 'Approved' | 'Rejected'}>
          {status}
        </Badge>
      );
    },
  },
  {
    header: 'Pilih Status',
    cell: (row) => {
      const currentStatus = newData.find(
        (item) => item.id === row.row.original.id
      )?.status;
      return (
        <Select
          value={currentStatus}
          onValueChange={(newStatus) =>
            handleDataChange(row.row.original.id, undefined, newStatus)
          }
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
      );
    },
  },
];
