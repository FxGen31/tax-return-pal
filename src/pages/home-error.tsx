import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function HomeErrorPage() {
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
            </div>
            <Separator className='my-4' />
            <div className='flex h-[450px] shrink-0 items-center justify-center rounded-md border-2 border-dashed'>
                <div className='mx-auto flex max-w-[420px] flex-col items-center justify-center text-center'>
                    <AlertTriangle className='h-24 w-24 text-red-700' />
                    <h2 className='text-3xl font-semibold mt-3'>
                        Oh no... We lost this page
                    </h2>
                    <p className='text-muted-foreground mt-3'>
                        We searched everywhere but couldn't find what you're
                        looking for. Let's find a better place for you to go.
                    </p>
                    <NavLink to='/'>
                        <Button className='mt-8'>Back to Home</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
