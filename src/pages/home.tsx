import {
    repositoriesStatus,
    selectAllRepositories,
} from '@/redux/slices/repositories-slice';
import { useAppSelector } from '@/redux/store';
import { Plus } from 'lucide-react';
import AddRepositoryDialog from '@/components/add-repository-dialog';
import EmptyRepositoryPlaceholder from '@/components/empty-repository-placeholder';
import RepositoryList from '@/components/repository-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import HomeLoadingPage from '@/pages/home-loading';
import HomeErrorPage from '@/pages/home-error';

// Application homepage
export default function HomePage() {
    // Existing repositories
    const repositories = useAppSelector(selectAllRepositories);
    const currentRepositoriesStatus = useAppSelector(repositoriesStatus);

    if (currentRepositoriesStatus === "loading") return <HomeLoadingPage />;
    if (currentRepositoriesStatus === 'failed') return <HomeErrorPage />;
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
