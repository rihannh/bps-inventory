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

const laporanSchema = z.object({
  tanggal_mulai: z.date({
    required_error: 'Tanggal Mulai tidak boleh kosong.',
  }),
  tanggal_selesai: z.date({
    required_error: 'Tanggal Selesai tidak boleh kosong.',
  }),
});

export default function LaporanPermintaan() {
  const form = useForm<z.infer<typeof laporanSchema>>({
    resolver: zodResolver(laporanSchema),
    defaultValues: {
      tanggal_mulai: new Date(),
      tanggal_selesai: new Date(),
    },
  });

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
  


  function onSubmit(values: z.infer<typeof laporanSchema>) {
    console.log(values);
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
            name='tanggal_mulai'
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
            name='tanggal_selesai'
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
            <Button className='bg-green-500'> <Printer /> </Button>
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

