import {UserTable} from '@/components/UserTable';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {adminPengajuanColumns} from '@/lib/columns/admin-pengajuan-column';
import {dataAdmin} from '@/lib/data/admin-dummy';
import {PlusCircle} from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

export default function DataAdminPengajuan() {
  return (
    <>
      <Card className='p-6'>
        <div className='flex justify-between'>
          <h1
            className={`mb-6 ml-5 text-2xl font-semibold relative before:absolute before:-left-5 before:w-1 before:bg-violet-500  before:border-0 before:h-full before:rounded-md`}
          >
            Data Admin Pengajuan
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button>
                  <PlusCircle /> Tambah Admin Pengajuan
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tambah Admin Pengajuan</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <UserTable data={dataAdmin} columns={adminPengajuanColumns} />
      </Card>
    </>
  );
}
