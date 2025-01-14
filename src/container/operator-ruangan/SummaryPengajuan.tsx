import {TransaksiTable} from '@/components/TransaksiTable';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {summaryPengajuanOperatorColumns} from '@/lib/columns/summary-pengajuan-operator-column';
import {dataSummaryPengajuan} from '@/lib/data/barang';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import {PlusCircle} from 'lucide-react';
import PengajuanForm from '@/components/PengajuanForm';

export default function SummaryPengajuan() {
  return (
    <Card className='p-6'>
      <div className='flex flex-col lg:flex-row justify-between items-center'>
        <h1
          className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
        >
          Data Pengajuan Barang
        </h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className='mr-auto lg:mr-0'>
              <Dialog>
                <DialogTrigger>
                  <Button>
                    <PlusCircle /> Buat Pengajuan Barang
                  </Button>
                </DialogTrigger>
                <DialogContent className='max-h-[80%] max-w-[90%] overflow-auto'>
                  <DialogHeader className='text-xl font-semibold'>
                    Pengajuan Barang
                  </DialogHeader>
                  <PengajuanForm />
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent>Buat Pengajuan Barang</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <TransaksiTable
        columns={summaryPengajuanOperatorColumns}
        data={dataSummaryPengajuan}
      />
    </Card>
  );
}
