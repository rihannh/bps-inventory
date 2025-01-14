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
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar} from '@/components/ui/calendar';
import {CalendarIcon} from 'lucide-react';
import {format} from 'date-fns';
import {id} from 'date-fns/locale';
import {cn, toTitleCase} from '@/lib/utils';
import {useQuery} from '@tanstack/react-query';
import {fetchDetailPermintaaan} from '@/lib/services/fetch';
import {LoadingSpinner} from './ui/loading';
import {generateBlanko} from '@/lib/services/blankoServices';

const blankoSchema = z.object({
  no_bukti: z.string().nonempty({message: 'Nomor bukti tidak boleh kosong.'}),
  no_dokumen: z
    .string()
    .nonempty({message: 'Nomor dokumen tidak boleh kosong.'}),
  tanggal: z.date(),
});

export default function BlankoForm({
  ruanganID,
  tanggal,
  ruangan,
}: {
  ruanganID: string;
  tanggal: string;
  ruangan: string;
}) {
  const {data, isLoading, error} = useQuery({
    queryKey: ['detail-permintaan', ruanganID, tanggal],
    queryFn: () => fetchDetailPermintaaan(ruanganID, tanggal),
  });
  const form = useForm<z.infer<typeof blankoSchema>>({
    resolver: zodResolver(blankoSchema),
    defaultValues: {
      no_bukti: '',
      no_dokumen: '',
      tanggal: new Date(), // Tanggal sekarang sebagai default value
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
  const dataDetailPermintaan = data?.data ?? [];
  function onSubmit(values: z.infer<typeof blankoSchema>) {
    const formattedData = {
      ...values,
      tanggal: format(values.tanggal, 'dd MMMM yyyy', {locale: id}),
      ruangan: ruangan,
    };
    const filteredDetail = dataDetailPermintaan.filter(
      (item: {status: string}) => item.status === 'Approved'
    );
    console.log('Formatted Data:', formattedData);
    console.log('Detail Permintaan:', filteredDetail);
    generateBlanko({letterData: filteredDetail, letterDesc: formattedData});
    // console.log(toTitleCase('ADADJHSAD'));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='no_bukti'
          render={({field}) => (
            <FormItem>
              <FormLabel>Nomor Bukti</FormLabel>
              <FormControl>
                <Input placeholder='Masukkan Nomor Bukti' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='no_dokumen'
          render={({field}) => (
            <FormItem>
              <FormLabel>Nomor Dokumen</FormLabel>
              <FormControl>
                <Input placeholder='Masukkan Nomor Dokumen' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tanggal'
          render={({field}) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Tanggal</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'd MMMM yyyy', {locale: id})
                      ) : (
                        <span>Pilih Tanggal</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Cetak</Button>
      </form>
    </Form>
  );
}
