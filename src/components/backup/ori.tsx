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
import {useQuery} from '@tanstack/react-query';
import {fetchAllBarang} from '@/lib/services/fetch';
import Select from 'react-select';
import {LoadingSpinner} from './ui/loading';
import DataTable from './DataTable';
import {useState} from 'react';
import {useToast} from '@/hooks/use-toast';
import {base} from '@/lib/network/base';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs';
import {
  Select as SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const registeredPermintaanSchema = z.object({
  id_user_registered: z.string(),
  nama_registered: z.string().min(1, {message: 'Nama tidak boleh kosong.'}),
  jabatan_registered: z.string().min(1, {message: 'Jabatan tidak boleh kosong.'}),
  id_ruangan_registered: z.string().min(1, {message: 'Ruangan harus dipilih.'}),
  tanggal_registered: z.string().min(1, {message: 'Tanggal harus diisi.'}),
  id_barang_registered: z.string().min(1, {message: 'Barang harus dipilih.'}),
  nama_barang_registered: z.string(),
  kategori_registered: z.string().min(1, {message: 'Jenis barang tidak boleh kosong.'}),
  satuan_registered: z.string().min(1, {message: 'Satuan tidak boleh kosong.'}),
  stok_registered: z.coerce.number().positive({message: 'Stok tidak boleh kosong.'}),
  jumlah_registered: z.coerce
    .number()
    .positive({message: 'Jumlah permintaan harus lebih dari 0.'}),
});
const unregisteredPermintaanSchema = z.object({
  id_user_unregistered: z.string(),
  nama_unregistered: z.string().min(1, {message: 'Nama tidak boleh kosong.'}),
  jabatan_unregistered: z.string().min(1, {message: 'Jabatan tidak boleh kosong.'}),
  id_ruangan_unregistered: z.string().min(1, {message: 'Ruangan harus dipilih.'}),
  tanggal_unregistered: z.string().min(1, {message: 'Tanggal harus diisi.'}),
  id_barang_unregistered: z.string().min(1, {message: 'Barang harus dipilih.'}),
  nama_barang_unregistered: z.string(),
  kategori_unregistered: z.string().min(1, {message: 'Jenis barang tidak boleh kosong.'}),
  satuan_unregistered: z.string().min(1, {message: 'Satuan tidak boleh kosong.'}),
  stok_unregistered: z.coerce.number().positive({message: 'Stok tidak boleh kosong.'}),
  jumlah_unregistered: z.coerce
    .number()
    .positive({message: 'Jumlah permintaan harus lebih dari 0.'}),
});

export default function PengajuanForm() {
  const [batchData, setBatchData] = useState<
    Array<{
      nama_barang: string;
      kategori: string;
      satuan: string;
      stok: number | string;
      jumlah: number;
    }>
  >([]);

  const [requestData, setRequestData] = useState<
    Array<{
      id_barang: string;
      nama_barang: string;
      kategori: string;
      satuan: string;
      id_user: string;
      id_ruangan: string;
      jumlah: number;
    }>
  >([]);

  const toast = useToast();
  // const queryClient = useQueryClient();

  const {
    data: dataAllBarang,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['barang'],
    queryFn: fetchAllBarang,
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}') as {
    id_user: string;
    username: string;
    jabatan: string;
    data_ruangan: {id_ruangan: string; ruangan: string}[];
  };
  const ruanganUser = user.data_ruangan;
  const ruanganOptions = ruanganUser.map(
    (item: {id_ruangan: string; ruangan: string}) => ({
      value: item.id_ruangan,
      label: item.ruangan,
    })
  );

  const allBarang = dataAllBarang?.data ?? [];
  const barangOptions = allBarang.map(
    (item: {id_barang: string; nama_barang: string}) => ({
      value: item.id_barang,
      label: item.nama_barang,
    })
  );

  const registeredItemForm = useForm<z.infer<typeof registeredPermintaanSchema>>({
    resolver: zodResolver(registeredPermintaanSchema),
    defaultValues: {
      id_user_registered: user.id_user,
      nama_registered: user.username,
      jabatan_registered: user.jabatan,
      id_ruangan_registered: '',
      tanggal_registered: new Date().toISOString().split('T')[0],
      id_barang_registered: '0',
      nama_barang_registered: '',
      kategori_registered: '',
      satuan_registered: '',
      stok_registered: 0,
      jumlah_registered: undefined,
    },
  });
  const unregisteredItemForm = useForm<z.infer<typeof unregisteredPermintaanSchema>>({
    resolver: zodResolver(unregisteredPermintaanSchema),
    defaultValues: {
      id_user_unregistered: user.id_user,
      nama_unregistered: user.username,
      jabatan_unregistered: user.jabatan,
      id_ruangan_unregistered: '',
      tanggal_unregistered: new Date().toISOString().split('T')[0],
      id_barang_unregistered: '0',
      nama_barang_unregistered: '',
      kategori_unregistered: '',
      satuan_unregistered: '',
      stok_unregistered: 0,
      jumlah_unregistered: undefined,
    },
  });

  // Fungsi untuk menangani perubahan barang yang dipilih
  const handleBarangChange = (
    selectedOption: {value: string; label: string} | null
  ) => {
    const barangId = selectedOption?.value;
    const selectedBarang = allBarang.find(
      (item: {id_barang: string}) => item.id_barang === barangId
    );

    // Jika barang ditemukan, update kategori, satuan, dan stok
    if (selectedBarang) {
      registeredItemForm.setValue(
        'nama_barang_registered',
        selectedBarang.nama_barang || ''
      );
      registeredItemForm.setValue('kategori_registered', selectedBarang.kategori || '');
      registeredItemForm.setValue('satuan_registered', selectedBarang.satuan || '');
      registeredItemForm.setValue('stok_registered', selectedBarang.stok || 0);
    } else {
      registeredItemForm.setValue('nama_barang_registered', '');
      registeredItemForm.setValue('kategori_registered', '');
      registeredItemForm.setValue('satuan_registered', '');
      registeredItemForm.setValue('stok_registered', 0);
    }

    // Update nilai barang yang dipilih
    registeredItemForm.setValue('id_barang_registered', selectedOption?.value || '');
  };

  function onSubmitRegistered(values: z.infer<typeof registeredPermintaanSchema>) {
    const newData = {
      id_barang: values.id_barang_registered,
      nama_barang: values.nama_barang_registered,
      kategori: values.kategori_registered,
      satuan: values.satuan_registered,
      id_user: values.id_user_registered,
      id_ruangan: values.id_ruangan_registered,
      jumlah: values.jumlah_registered,
    };

    const newBatchData = {
      nama_barang: values.nama_barang_registered,
      kategori: values.kategori_registered,
      satuan: values.satuan_registered,
      stok: values.stok_registered,
      jumlah: values.jumlah_registered,
    };

    setRequestData((prev) => [...prev, newData]);
    setBatchData((prev) => [...prev, newBatchData]);

    console.log('New Data:', newData);
  }
  function onSubmitUnegistered(values: z.infer<typeof unregisteredPermintaanSchema>) {
    const newData = {
      id_barang: values.id_barang_unregistered,
      nama_barang: values.nama_barang_unregistered,
      kategori: values.kategori_unregistered,
      satuan: values.satuan_unregistered,
      id_user: values.id_user_unregistered,
      id_ruangan: values.id_ruangan_unregistered,
      jumlah: values.jumlah_unregistered,
    };

    const newBatchData = {
      nama_barang: values.nama_barang_unregistered,
      kategori: values.kategori_unregistered,
      satuan: values.satuan_unregistered,
      stok: values.stok_unregistered,
      jumlah: values.jumlah_unregistered,
    };

    setRequestData((prev) => [...prev, newData]);
    setBatchData((prev) => [...prev, newBatchData]);

    console.log('New Data:', newData);
  }

  const handleSubmitBatch = async () => {
    try {
      console.log('Batch Request Data:', requestData);
      // const response = await base.post('/tambah_permintaan', requestData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // console.log('Response:', response.data);
      // toast.toast({
      //   title: 'Berhasil',
      //   description: response.data.message,
      // });
      // queryClient.invalidateQueries({queryKey:})
    } catch (error) {
      console.error('Gagal mengupdate data:', error);
      toast.toast({
        variant: 'destructive',
        title: 'Gagal',
        description: 'Gagal mengupdate data barang',
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className='flex'>
      <div className='w-2/5 pr-4'>
        <Tabs defaultValue='0'>
          <TabsList>
            <TabsTrigger value='0'>Form Barang Terdaftar</TabsTrigger>
            <TabsTrigger value='1'>Form Barang Terdaftar</TabsTrigger>
          </TabsList>
          <TabsContent value='0'>
             {/* Form untuk barang terdaftar di database */}
            <Form {...registeredItemForm}> 
              <form
                onSubmit={registeredItemForm.handleSubmit(onSubmitRegistered)}
                className='space-y-8'
              >
                <FormField
                  control={registeredItemForm.control}
                  name='nama_registered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Nama' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registeredItemForm.control}
                  name='jabatan_registered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Jabatan</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Jabatan' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registeredItemForm.control}
                  name='id_ruangan_registered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Ruangan</FormLabel>
                      <FormControl>
                        <Select
                          options={ruanganOptions}
                          onChange={(selectedOption) =>
                            field.onChange(
                              selectedOption ? selectedOption.value : ''
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registeredItemForm.control}
                  name='tanggal_registered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tanggal</FormLabel>
                      <FormControl>
                        <Input disabled type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registeredItemForm.control}
                  name='id_barang_registered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Barang</FormLabel>
                      <FormControl>
                        <Select
                          options={barangOptions}
                          onChange={handleBarangChange}
                          value={barangOptions.find(
                            (item: {value: string; label: string}) =>
                              item.value === field.value
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registeredItemForm.control}
                  name='kategori_registered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Kategori Barang</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder='Kategori Barang'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registeredItemForm.control}
                  name='satuan_registered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Satuan</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Satuan' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registeredItemForm.control}
                  name='stok_registered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Stok</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          type='number'
                          placeholder='Stok'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registeredItemForm.control}
                  name='jumlah_registered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Jumlah Permintaan</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Jumlah Permintaan'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Tambahkan</Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value='1'>
             {/* Form untuk barang baru yang belum terdaftar di database */}
            <Form {...unregisteredItemForm}>
              <form
                onSubmit={unregisteredItemForm.handleSubmit(onSubmitUnegistered)}
                className='space-y-8'
              >
                <FormField
                  control={unregisteredItemForm.control}
                  name='nama_unregistered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Nama' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={unregisteredItemForm.control}
                  name='jabatan_unregistered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Jabatan</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Jabatan' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={unregisteredItemForm.control}
                  name='id_ruangan_unregistered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Ruangan</FormLabel>
                      <FormControl>
                        <Select
                          options={ruanganOptions}
                          onChange={(selectedOption) =>
                            field.onChange(
                              selectedOption ? selectedOption.value : ''
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={unregisteredItemForm.control}
                  name='tanggal_unregistered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tanggal</FormLabel>
                      <FormControl>
                        <Input disabled type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={unregisteredItemForm.control}
                  name='nama_barang_unregistered'
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
                  control={unregisteredItemForm.control}
                  name='kategori_unregistered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Kategori Barang</FormLabel>
                      <FormControl>
                        <Input placeholder='Kategori Barang' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={unregisteredItemForm.control}
                  name='satuan_unregistered'
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
                  control={unregisteredItemForm.control}
                  name='jumlah_unregistered'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Jumlah Permintaan</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Jumlah Permintaan'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Tambahkan</Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
      <div className='w-3/5 pl-4 border-l'>
        <DataTable
          columns={[
            {header: 'Nama Barang', accessorKey: 'nama_barang'},
            {header: 'Kategori', accessorKey: 'kategori'},
            {header: 'Satuan', accessorKey: 'satuan'},
            {header: 'Stok', accessorKey: 'stok'},
            {header: 'Jumlah', accessorKey: 'jumlah'},
          ]}
          data={batchData}
          column_name='nama_barang'
        />
        <Button className='mt-4' onClick={handleSubmitBatch}>
          Submit Batch
        </Button>
      </div>
    </div>
  );
}
