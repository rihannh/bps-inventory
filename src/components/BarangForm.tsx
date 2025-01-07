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
import {useEffect} from 'react';
import {dataBarang} from '@/lib/data/barang';
import {base} from '@/lib/network/base';
import {useToast} from '@/hooks/use-toast';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import {useQueryClient} from '@tanstack/react-query';

const barangSchema = z.object({
  kd_barang: z.string().nonempty({message: 'Kode barang tidak boleh kosong.'}),
  nama_barang: z
    .string()
    .min(1, {message: 'Nama barang tidak boleh kosong.'})
    .max(100, {message: 'Nama barang tidak boleh lebih dari 100 karakter.'}),
  kategori: z
    .string()
    .nonempty({message: 'Kategori barang tidak boleh kosong.'}),
  satuan: z.string().nonempty({message: 'Satuan barang tidak boleh kosong.'}),
  stok: z
    .number()
    .int({message: 'Stok barang harus berupa bilangan bulat.'})
    .nonnegative({message: 'Stok barang tidak boleh kurang dari 0.'}),
  stok_dasar: z
    .number()
    .int({message: 'Stok barang harus berupa bilangan bulat.'})
    .nonnegative({message: 'Stok barang tidak boleh kurang dari 0.'}),
  harga_satuan: z
    .number()
    .positive({message: 'Harga barang harus lebih dari 0.'}),
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
      kd_barang: '',
      nama_barang: '',
      satuan: '',
      kategori: '',
      stok: 0,
      stok_dasar: 0,
      harga_satuan: 0,
    },
  });
  const toast = useToast();
  const queryClient = useQueryClient();

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

  async function onSubmit(values: z.infer<typeof barangSchema>) {
    if (type === 'add') {
      try {
        console.log('add', values);
        const response = await base.post('/insert_barang', values);
        console.log('this is response server:', response);
        toast.toast({
          title: 'Berhasil',
          description: response.data.message,
        });
        const resultAtk = await queryClient.invalidateQueries({
          queryKey: ['data-barang-atk'],
        });
        console.log('Invalidate ATK Result:', resultAtk);
  
        const resultArk = await queryClient.invalidateQueries({
          queryKey: ['data-barang-ark'],
        });
        console.log('Invalidate ARK Result:', resultArk);
      } catch (error) {
        toast.toast({
          variant: 'destructive',
          title: 'Gagal',
          description: 'Gagal menyimpan data barang',
        });
        console.error(error);
      }
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
          name='kd_barang'
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
          name='nama_barang'
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
          name='kategori'
          render={({field}) => (
            <FormItem>
              <FormLabel>Kategori Barang</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Kategori Barang' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='ATK'>ATK</SelectItem>
                    <SelectItem value='ARK'>ARK</SelectItem>
                  </SelectContent>
                </Select>
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
