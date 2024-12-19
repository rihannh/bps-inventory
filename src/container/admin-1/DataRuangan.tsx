import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {PlusCircle} from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {RuanganTable} from '@/components/RuanganTable';
import {dataRuangan} from '@/lib/data/ruangan-dummy';
import {ruanganColumns} from '@/lib/columns/ruangan-column';

export default function DataRuangan() {
  return (
    <>
      <Card className='p-6'>
        <div className='flex flex-col lg:flex-row lg:justify-between'>
          <h1
            className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
          >
            Data Admin
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='mr-auto lg:mr-0'>
                <Button>
                  <PlusCircle /> Tambah Admin
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tambah Admin</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <RuanganTable data={dataRuangan} columns={ruanganColumns} />
      </Card>
    </>
  );
}
