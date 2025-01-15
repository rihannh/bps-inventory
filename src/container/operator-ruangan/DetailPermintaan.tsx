import {TransaksiTable} from '@/components/TransaksiTable';
import { LoadingSpinner } from '@/components/ui/loading';
import { useToast } from '@/hooks/use-toast';
import { detailPermintaanOperatorColumns } from '@/lib/columns/detail-permintaan-operator-column';
import { fetchDetailPermintaaan } from '@/lib/services/fetch';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function DetailPermintaan({
  ruanganID,
  tanggal,
}: {
  ruanganID: string;
  tanggal: string;
}) {

  const queryClient = useQueryClient();
  const toast = useToast();
  const {data, isLoading, error} = useQuery({
    queryKey: ['detail-permintaan', ruanganID, tanggal],
    queryFn: () => fetchDetailPermintaaan(ruanganID, tanggal),
  });

  const [newData, setNewData] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) {
      const formattedData = data.data.map((item: any) => ({
        id_permintaan: item.id_permintaan,
        jumlah: item.jumlah,
        status: item.status,
      }));
      // console.log('data:' ,data.data);
      // console.log('formated',formattedData);
      setNewData(formattedData);
    }
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
  const dataPermintaanBarang = data?.data ?? [];
  console.log(dataPermintaanBarang);
  


  return (
    <TransaksiTable
      columns={detailPermintaanOperatorColumns}
      data={dataPermintaanBarang}
    />
  );
}
