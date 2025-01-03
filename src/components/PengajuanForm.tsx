import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const pengajuanSchema = z.object({
  nama: z.string().min(1, { message: 'Nama tidak boleh kosong.' }),
  jabatan: z.string().min(1, { message: 'Jabatan tidak boleh kosong.' }),
  ruangan: z.string().min(1, { message: 'Ruangan harus dipilih.' }),
  tanggal: z.string().min(1, { message: 'Tanggal harus diisi.' }),
  barang: z.string().min(1, { message: 'Barang harus dipilih.' }),
  jenisBarang: z.string().min(1, { message: 'Jenis barang tidak boleh kosong.' }),
  satuan: z.string().min(1, { message: 'Satuan tidak boleh kosong.' }),
  stok: z.number().nonnegative({ message: 'Stok tidak boleh kurang dari 0.' }),
  harga: z.number().nonnegative({ message: 'Harga tidak boleh kurang dari 0.' }),
  jumlahPermintaan: z.number().positive({ message: 'Jumlah permintaan harus lebih dari 0.' }),
});

export default function PengajuanForm() {

  const form = useForm<z.infer<typeof pengajuanSchema>>({
    resolver: zodResolver(pengajuanSchema),
    defaultValues: {
      nama: 'Rihan',
      jabatan: 'Lord',
      ruangan: 'Ruangan ini',
      tanggal: new Date().toISOString().split('T')[0], 
      barang: '',
      jenisBarang: 'ATK',
      satuan: 'Ton',
      stok: 150,
      harga: 1000,
      jumlahPermintaan: 1,
    },
  });

  function onSubmit(values: z.infer<typeof pengajuanSchema>) {
    console.log('Pengajuan:', values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input disabled placeholder="Nama" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jabatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jabatan</FormLabel>
              <FormControl>
                <Input disabled placeholder="Jabatan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ruangan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ruangan</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Ruangan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ruang 1">Ruang 1</SelectItem>
                    <SelectItem value="Ruang 2">Ruang 2</SelectItem>
                    <SelectItem value="Ruang 3">Ruang 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tanggal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal</FormLabel>
              <FormControl>
                <Input disabled type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="barang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barang</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Barang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Barang A">Barang A</SelectItem>
                    <SelectItem value="Barang B">Barang B</SelectItem>
                    <SelectItem value="Barang C">Barang C</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jenisBarang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Barang</FormLabel>
              <FormControl>
                <Input disabled placeholder="Jenis Barang" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="satuan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Satuan</FormLabel>
              <FormControl>
                <Input disabled placeholder="Satuan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stok"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stok</FormLabel>
              <FormControl>
                <Input
                disabled
                  type="number"
                  placeholder="Stok"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="harga"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stok</FormLabel>
              <FormControl>
                <Input
                disabled
                  type="number"
                  placeholder="HargA"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jumlahPermintaan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Permintaan</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Jumlah Permintaan"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
