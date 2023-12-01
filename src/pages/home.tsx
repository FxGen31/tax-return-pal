import AddRepositoryDialog from '@/components/add-repository-dialog';
import EmptyRepositoryPlaceholder from '@/components/empty-repository-placeholder';
import RepositoryList from '@/components/repository-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { selectAllRepositories } from '@/redux/slices/repositories-slice';
import { useAppSelector } from '@/redux/store';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';

export default function HomePage() {
    const repositories = useAppSelector(selectAllRepositories);

    useEffect(() => {
        console.log(repositories);
    }, [repositories]);

    return (
        <div className='ml-5 mr-8 mt-6 flex flex-col'>
            <div className='flex items-center justify-between'>
                <div className='space-y-1.5'>
                    <h2 className='text-3xl font-semibold'>
                        Repository Explorer
                    </h2>
                    <p className='text-muted-foreground'>
                        Manage Your Tax Return Document Repositories.
                    </p>
                </div>
                <AddRepositoryDialog>
                    <Button size='sm' className='relative'>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Repository
                    </Button>
                </AddRepositoryDialog>
            </div>
            <Separator className='my-4' />
            {repositories.length > 0 ? (
                <RepositoryList repositories={repositories} />
            ) : (
                <EmptyRepositoryPlaceholder />
            )}
        </div>
    );
}
