import {TransaksiTable} from '@/components/TransaksiTable';
import { detailPermintaanColumns } from '@/lib/columns/detail-permintaan-column';
import {dataDetailPermintaan} from '@/lib/data/barang';

export default function DetailPermintaan() {
  return (
    <TransaksiTable
      columns={detailPermintaanColumns}
      data={dataDetailPermintaan}
    />
  );
}
