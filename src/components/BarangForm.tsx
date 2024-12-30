import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import { useEffect } from 'react';
import { dataBarang } from '@/lib/data/barang';

const barangSchema = z.object({
  kode_barang: z
    .string()
    .min(1, {message: 'Kode barang tidak boleh kosong.'})
    .max(50, {message: 'Kode barang tidak boleh lebih dari 50 karakter.'}),
  nama: z
    .string()
    .min(1, {message: 'Nama barang tidak boleh kosong.'})
    .max(100, {message: 'Nama barang tidak boleh lebih dari 100 karakter.'}),
  satuan: z
    .string()
    .min(1, {message: 'Satuan barang tidak boleh kosong.'})
    .max(20, {message: 'Satuan barang tidak boleh lebih dari 20 karakter.'}),
  stok: z
    .number()
    .int({message: 'Stok barang harus berupa bilangan bulat.'})
    .nonnegative({message: 'Stok barang tidak boleh kurang dari 0.'}),
  stok_dasar: z
    .number()
    .int({message: 'Stok barang harus berupa bilangan bulat.'})
    .nonnegative({message: 'Stok barang tidak boleh kurang dari 0.'}),
  harga_satuan: z.number().positive({message: 'Harga barang harus lebih dari 0.'}),
});

export default function BarangForm({
  id,
  type,
}: {
  id?: string;
  type: 'edit' | 'add';
}) {
  const form = useForm<z.infer<typeof barangSchema>>({
    resolver: zodResolver(barangSchema),
    defaultValues: {
      kode_barang: '',
      nama: '',
      satuan: '',
      stok: 0,
      stok_dasar: 0,
      harga_satuan: 0,
    },
  });

  const {setValue} = form;
  useEffect(() => {
    if (id) {
      const detailBarang = dataBarang.find((admin) => admin.id === id);
      if (detailBarang) {
        Object.entries(detailBarang).forEach(([key, value]) => {
          setValue(key as keyof z.infer<typeof barangSchema>, value);
        });
      }
    }
  }, [id, setValue]);

  function onSubmit(values: z.infer<typeof barangSchema>) {
    if (type === 'add') {
      console.log('add', values);
    }
    if (type === 'edit') {
      console.log('edit', values);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-8'>
        <FormField
          control={form.control}
          name='kode_barang'
          render={({field}) => (
            <FormItem>
              <FormLabel>Kode Barang</FormLabel>
              <FormControl>
                <Input placeholder='Kode Barang' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nama'
          render={({field}) => (
            <FormItem>
              <FormLabel>Nama Barang</FormLabel>
              <FormControl>
                <Input placeholder='Nama Barang' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='satuan'
          render={({field}) => (
            <FormItem>
              <FormLabel>Satuan</FormLabel>
              <FormControl>
                <Input placeholder='Satuan' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='stok'
          render={({field}) => (
            <FormItem>
              <FormLabel>Stok</FormLabel>
              <FormControl>
                <Input
                  placeholder='Stok'
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='stok_dasar'
          render={({field}) => (
            <FormItem>
              <FormLabel>Stok Dasar</FormLabel>
              <FormControl>
                <Input
                  placeholder='Stok Dasar'
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='harga_satuan'
          render={({field}) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <FormControl>
                <Input
                  placeholder='Harga'
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
