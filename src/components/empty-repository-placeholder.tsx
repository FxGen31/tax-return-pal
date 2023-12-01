import { Plus, Radar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddRepositoryDialog from '@/components/add-repository-dialog';

export default function EmptyRepositoryPlaceholder() {
    return (
        <div className='flex h-[450px] shrink-0 items-center justify-center rounded-md border-2 border-dashed'>
            <div className='mx-auto flex max-w-[420px] flex-col items-center justify-center text-center'>
                <Radar className='h-10 w-10 text-muted-foreground' />
                <h3 className='mt-4 text-lg font-semibold'>
                    No repository added
                </h3>
                <p className='mb-4 mt-2 text-sm text-muted-foreground'>
                    You have not added any repository. Add one to start.
                </p>
                <AddRepositoryDialog>
                    <Button size='sm' className='relative'>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Repository
                    </Button>
                </AddRepositoryDialog>
            </div>
        </div>
    );
}
