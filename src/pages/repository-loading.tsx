import { Separator } from '@/components/ui/separator';
import { RefreshCw } from 'lucide-react';

export default function RepositoryLoadingPage() {
    return (
        <div className='ml-5 mr-8 mt-6 flex flex-col'>
            <div className='flex items-center justify-between'>
                <div className='space-y-1.5'>
                    <h2 className='text-3xl font-semibold'>
                        Repository Viewer
                    </h2>
                    <p className='text-muted-foreground'>
                        Repository Description
                    </p>
                </div>
            </div>
            <Separator className='my-4' />
            <div className='flex h-[450px] shrink-0 items-center justify-center rounded-md border-2 border-dashed'>
                <div className='mx-auto flex max-w-[420px] flex-col items-center justify-center text-center'>
                    <h2 className='text-3xl font-semibold '>Loading...</h2>
                    <p className='text-muted-foreground mt-3'>
                        Manage your tax return related document with the help of
                        Tax Return Pal!
                    </p>
                    <RefreshCw className='animate-spin h-16 w-16 text-muted-foreground mt-5' />
                </div>
            </div>
        </div>
    );
}
