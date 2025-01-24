import {laporanPermintaanColumns} from '@/lib/columns/laporan-permintaan-column';
import {dataBarangPermintaan} from '@/lib/data/barang';
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
import {format} from 'date-fns';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {CalendarIcon, Printer} from 'lucide-react';
import {Calendar} from '@/components/ui/calendar';
import {Card} from '@/components/ui/card';
import DataTable from '@/components/DataTable';
import { useState } from 'react';
import { generateKarken } from '@/lib/services/pengajuanService';
import { KarkenProps } from '@/components/Karken';
import { fetchDataKarken, fetchDataTableKarken } from '@/lib/services/fetch';
import { useQuery } from '@tanstack/react-query';

const laporanSchema = z.object({
  tgl_mulai: z.date({
    required_error: 'Tanggal Mulai tidak boleh kosong.',
  }),
  tgl_selesai: z.date({
    required_error: 'Tanggal Selesai tidak boleh kosong.',
  }),
});

interface KartuKendaliData {
  download_url: KarkenProps[];
  message: string;
  status: boolean;
}

export default function LaporanPermintaan() {
  const form = useForm<z.infer<typeof laporanSchema>>({
    resolver: zodResolver(laporanSchema),
    defaultValues: {
      tgl_mulai: new Date(),
      tgl_selesai: new Date(),
    },
  });

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [dataCetak, setDataCetak] = useState<KartuKendaliData['download_url'] | null>(null);
  // const [dataTable, setDataTable] = useState<ListTransaksi[]>([]);
  

  const {data: responsePrint} = useQuery({
    queryKey: ['detail-karken'],
    queryFn: fetchDataKarken,
  });

  const dataForKarken = dataCetak ?? [{
    id_barang: 0,
    nama_barang: '',
    kd_barang:'',
    satuan: '',
    rows: [],
  }];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(dataBarangPermintaan.map((row) => row.id_permintaan));
    } else {
      setSelectedRows([]);
    }
  };
  
  const handleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  function printKarken() {
    const dataKarken = {dataKarken: dataForKarken } ; // Bungkus data ke dalam objek
    console.log('data for KAK', dataKarken);
    generateKarken(dataKarken);
  }
  


  function onSubmit(values: z.infer<typeof laporanSchema>) {
    // console.log(responsePrint);

    const formatedValues = {
      tgl_mulai: format(values.tgl_mulai, 'yyyy-MM-dd'),
      tgl_akhir: format(values.tgl_selesai, 'yyyy-MM-dd'),
    };
    const responsePrint = fetchDataKarken;
    const responseTable = fetchDataTableKarken;
    // setDataTable(responseTable.data.data);

    setDataCetak(responsePrint.download_url);
  }
  return (
    <Card className='p-6'>
      <h1
        className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
      >
        Laporan Permintaan Barang
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' flex justify-center space-x-8 items-end w-full mb-4'
        >
          <FormField
            control={form.control}
            name='tgl_mulai'
            render={({field}) => (
              <FormItem>
                <FormLabel>Tanggal Mulai</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className='flex justify-start font-normal'
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tgl_selesai'
            render={({field}) => (
              <FormItem>
                <FormLabel>Tanggal Selesai</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className='flex justify-start font-normal'
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-2'>
            <Button type='submit'>Submit</Button>
            <Button onClick={printKarken} className='bg-green-500'> <Printer /> </Button>
          </div>
        </form>
      </Form>
      <DataTable
        columns={laporanPermintaanColumns(selectedRows, handleSelectAll, handleSelectRow)}
        data={dataBarangPermintaan}
      />
    </Card>
  );
}

