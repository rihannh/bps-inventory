import DataTable from '@/components/DataTable';
import {Card} from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading';
import { summaryPermintaanOperatorColumns } from '@/lib/columns/summary-permintaan-operator-column';
import { base } from '@/lib/network/base';
import {useQuery} from '@tanstack/react-query';

const user = JSON.parse(localStorage.getItem('user') || '{}') as {
  id_user: string;
  username: string;
  jabatan: string;
  data_ruangan: {id_ruangan: string; ruangan: string}[];
};

async function fetchPermintaan() {
  const response  = await base.get('/get_transaksi_permintaan');
  console.log(response.data.data);


   // Filter the data based on user.data_ruangan
   const userRuanganIds = user.data_ruangan.map((r) => r.id_ruangan); // Extract ruangan IDs
   const filteredData = response.data.data.filter((item: { id_ruangan: string }) =>
     userRuanganIds.includes(item.id_ruangan)
   );
 
   console.log(filteredData);
   return { ...response, data: filteredData }; // Return filtered data
}

export default function PermintaanBarang() {
  const {data, isLoading, error} = useQuery({
    queryKey: ['data-permintaan'],
    queryFn: fetchPermintaan,
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  const dataSummaryPermintaan = data?.data ?? [];
  console.log(dataSummaryPermintaan);
  return (
    <Card className='p-6'>
      <h1
        className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
      >
        Data Permintaan Barang
      </h1>
      <DataTable
        columns={summaryPermintaanOperatorColumns}
        data={dataSummaryPermintaan}
        search_placeholder='nama ruangan'
        column_name='ruangan'
      />
    </Card>
  );
}
