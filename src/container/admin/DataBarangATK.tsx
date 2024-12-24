import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Download, PlusCircle, Upload} from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {BarangTable} from '@/components/BarangTable';
import {dataBarang} from '@/lib/data/barang';
import {barangColumns} from '@/lib/columns/barang-column-edit';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import BarangForm from '@/components/BarangForm';

export default function DataBarangATK() {
  return (
    <>
      <Card className='p-6'>
        <div className='flex flex-col lg:flex-row lg:justify-between'>
          <h1
            className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
          >
            Data Barang ATK
          </h1>
          <div className='flex items-start flex-col lg:flex-row gap-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={'green'}>
                    <Upload /> Import
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Import Excel</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={'blue'}>
                    <Download /> Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download Format Excel</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Dialog>
                    <DialogTrigger>
                      <Button>
                        <PlusCircle /> Tambah Barang
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className='text-xl font-semibold'>
                        Tambah Barang ATK
                      </DialogHeader>
                      <BarangForm />
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>Tambah Barang ATK</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <BarangTable data={dataBarang} columns={barangColumns} />
      </Card>
    </>
  );
}
