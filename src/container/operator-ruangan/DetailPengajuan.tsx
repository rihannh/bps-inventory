import {TransaksiTable} from '@/components/TransaksiTable';
import { detailPengajuanColumns } from '@/lib/columns/detail-pengajuan-column';
import {dataDetailPengajuan} from '@/lib/data/barang';

export default function DetailPengajuan() {
  return (
    <TransaksiTable
      columns={detailPengajuanColumns}
      data={dataDetailPengajuan}
    />
  );
}
