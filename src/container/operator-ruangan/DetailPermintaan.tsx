import DataTable from '@/components/DataTable';
import { detailPermintaanOperatorColumns } from '@/lib/columns/detail-permintaan-operator-column';
import {dataDetailPermintaan} from '@/lib/data/barang';

export default function DetailPermintaan() {
  return (
    <DataTable
      columns={detailPermintaanOperatorColumns}
      data={dataDetailPermintaan}
    />
  );
}
