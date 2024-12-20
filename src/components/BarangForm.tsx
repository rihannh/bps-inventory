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

const barangSchema = z.object({
  kode: z
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
  harga: z.number().positive({message: 'Harga barang harus lebih dari 0.'}),
});

export default function BarangForm() {
  const form = useForm<z.infer<typeof barangSchema>>({
    resolver: zodResolver(barangSchema),
    defaultValues: {
      kode: '',
      nama: '',
      satuan: '',
      stok: 0,
      harga: 0,
    },
  });
  function onSubmit(values: z.infer<typeof barangSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-8'>
        <FormField
          control={form.control}
          name='kode'
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
          name='harga'
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
