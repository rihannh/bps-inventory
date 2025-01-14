// Parent Component: PengajuanForm
import RegisteredItemForm from './RegisteredItemForm';
import UnregisteredItemForm from './UnregisteredItemForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';

export default function PengajuanForm() {
  const [batchData, setBatchData] = useState<Array<any>>([]);
  const [requestData, setRequestData] = useState<Array<any>>([]);

  const handleRegisteredSubmit = (newData: any, newBatchData: any) => {
    setRequestData((prev) => [...prev, newData]);
    setBatchData((prev) => [...prev, newBatchData]);
  };

  const handleUnregisteredSubmit = (newData: any, newBatchData: any) => {
    setRequestData((prev) => [...prev, newData]);
    setBatchData((prev) => [...prev, newBatchData]);
  };

  return (
    <div className="flex">
      <div className="w-2/5 pr-4">
        <Tabs defaultValue="0">
          <TabsList>
            <TabsTrigger value="0">Form Barang Terdaftar</TabsTrigger>
            <TabsTrigger value="1">Form Barang Baru</TabsTrigger>
          </TabsList>
          <TabsContent value="0">
            <RegisteredItemForm onSubmit={handleRegisteredSubmit} />
          </TabsContent>
          <TabsContent value="1">
            <UnregisteredItemForm onSubmit={handleUnregisteredSubmit} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Child Component 1: RegisteredItemForm
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import Select from 'react-select';

const registeredPermintaanSchema = z.object({
  id_user_registered: z.string(),
  nama_registered: z.string().min(1, { message: 'Nama tidak boleh kosong.' }),
  jabatan_registered: z.string().min(1, { message: 'Jabatan tidak boleh kosong.' }),
  id_ruangan_registered: z.string().min(1, { message: 'Ruangan harus dipilih.' }),
  tanggal_registered: z.string().min(1, { message: 'Tanggal harus diisi.' }),
  id_barang_registered: z.string().min(1, { message: 'Barang harus dipilih.' }),
  nama_barang_registered: z.string(),
  kategori_registered: z.string().min(1, { message: 'Jenis barang tidak boleh kosong.' }),
  satuan_registered: z.string().min(1, { message: 'Satuan tidak boleh kosong.' }),
  stok_registered: z.coerce.number().positive({ message: 'Stok tidak boleh kosong.' }),
  jumlah_registered: z.coerce
    .number()
    .positive({ message: 'Jumlah permintaan harus lebih dari 0.' }),
});

export default function RegisteredItemForm({ onSubmit }: { onSubmit: (newData: any, newBatchData: any) => void }) {
  const registeredItemForm = useForm<z.infer<typeof registeredPermintaanSchema>>({
    resolver: zodResolver(registeredPermintaanSchema),
    defaultValues: {
      id_user_registered: '',
      nama_registered: '',
      jabatan_registered: '',
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

  function handleSubmit(values: z.infer<typeof registeredPermintaanSchema>) {
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

    onSubmit(newData, newBatchData);
  }

  return (
    <Form {...registeredItemForm}>
      <form onSubmit={registeredItemForm.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Add form fields similar to your original form here */}
        <Button type="submit">Tambahkan</Button>
      </form>
    </Form>
  );
}

// Child Component 2: UnregisteredItemForm
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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

const unregisteredPermintaanSchema = z.object({
  id_user_unregistered: z.string(),
  nama_unregistered: z.string().min(1, { message: 'Nama tidak boleh kosong.' }),
  jabatan_unregistered: z.string().min(1, { message: 'Jabatan tidak boleh kosong.' }),
  id_ruangan_unregistered: z.string().min(1, { message: 'Ruangan harus dipilih.' }),
  tanggal_unregistered: z.string().min(1, { message: 'Tanggal harus diisi.' }),
  nama_barang_unregistered: z.string().min(1, { message: 'Nama barang tidak boleh kosong.' }),
  kategori_unregistered: z.string().min(1, { message: 'Jenis barang tidak boleh kosong.' }),
  satuan_unregistered: z.string().min(1, { message: 'Satuan tidak boleh kosong.' }),
  stok_unregistered: z.coerce.number().positive({ message: 'Stok tidak boleh kosong.' }),
  jumlah_unregistered: z.coerce
    .number()
    .positive({ message: 'Jumlah permintaan harus lebih dari 0.' }),
});

export default function UnregisteredItemForm({ onSubmit }: { onSubmit: (newData: any, newBatchData: any) => void }) {
  const unregisteredItemForm = useForm<z.infer<typeof unregisteredPermintaanSchema>>({
    resolver: zodResolver(unregisteredPermintaanSchema),
    defaultValues: {
      id_user_unregistered: '',
      nama_unregistered: '',
      jabatan_unregistered: '',
      id_ruangan_unregistered: '',
      tanggal_unregistered: new Date().toISOString().split('T')[0],
      nama_barang_unregistered: '',
      kategori_unregistered: '',
      satuan_unregistered: '',
      stok_unregistered: 0,
      jumlah_unregistered: undefined,
    },
  });

  function handleSubmit(values: z.infer<typeof unregisteredPermintaanSchema>) {
    const newData = {
      id_barang: '',
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

    onSubmit(newData, newBatchData);
  }

  return (
    <Form {...unregisteredItemForm}>
      <form onSubmit={unregisteredItemForm.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Add form fields similar to your original form here */}
        <Button type="submit">Tambahkan</Button>
      </form>
    </Form>
  );
}
