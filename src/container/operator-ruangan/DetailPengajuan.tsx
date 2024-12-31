import {TransaksiTable} from '@/components/TransaksiTable';
import {detailPengajuanOperatorColumns} from '@/lib/columns/detail-pengajuan-operator-column';
import {dataDetailPengajuan} from '@/lib/data/barang';

export default function DetailPengajuan() {
  return (
    <TransaksiTable
      columns={detailPengajuanOperatorColumns}
      data={dataDetailPengajuan}
    />
  );
}
