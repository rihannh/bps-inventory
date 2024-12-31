import {TransaksiTable} from '@/components/TransaksiTable';
import { detailPermintaanOperatorColumns } from '@/lib/columns/detail-permintaan-operator-column';
import {dataDetailPermintaan} from '@/lib/data/barang';

export default function DetailPermintaan() {
  return (
    <TransaksiTable
      columns={detailPermintaanOperatorColumns}
      data={dataDetailPermintaan}
    />
  );
}
