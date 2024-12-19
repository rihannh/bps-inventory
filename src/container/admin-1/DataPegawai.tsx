import {UserTable} from '@/components/UserTable';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {pegawaiColumns} from '@/lib/columns/pegawai-column';
import {dataAdmin} from '@/lib/data/admin-dummy';
import {Download, PlusCircle, Upload} from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

export default function DataAdmin() {
  return (
    <>
      <Card className='p-6'>
        <div className='flex flex-col lg:flex-row lg:justify-between'>
          <h1
            className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
          >
            Data Pegawai
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
                  <Button>
                    <PlusCircle /> Tambah Pegawai
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Tambah Pegawai</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <UserTable data={dataAdmin} columns={pegawaiColumns} />
      </Card>
    </>
  );
}
