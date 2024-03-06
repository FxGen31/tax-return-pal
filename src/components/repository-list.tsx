import { Repository } from '@/types';
import { Link } from 'react-router-dom';
import { AppDispatch, useAppDispatch } from '@/redux/store';
import { deleteRepository } from '@/redux/slices/repositories-slice';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface RepositoryListProps {
    repositories: Array<Repository>;
}

/**
 * Display a list of existing repositories
 * @param {Array<Repository>} repositories - A list of repositories
 * @returns
 */
export default function RepositoryList({ repositories }: RepositoryListProps) {
    const dispatch: AppDispatch = useAppDispatch();

    /**
     * This function is invoked to delete the selected repository from the redux store and file system
     * @param {string} name - Name of the repository to be deleted
     */
    async function onDelete(id: string) {
        dispatch(
            deleteRepository({
                id,
            })
        )
            .unwrap()
            .then((promisedResult) => {
                toast({
                    title: 'Congratulation!',
                    description: `Your repository ${promisedResult.name} has been deleted.`,
                });
            })
            .catch((rejectedError) => {
                console.log(rejectedError);
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: rejectedError,
                });
            });
    }

    return (
        <ScrollArea className='h-[500px]'>
            <div className='space-y-4 flex flex-col'>
                {repositories.map((repository) => (
                    <Card key={repository.name}>
                        <CardHeader className='grid items-start gap-4 space-y-0'>
                            <div className='space-y-1'>
                                <CardTitle className='flex justify-between'>
                                    {repository.name}
                                    <span className=' text-sm text-muted-foreground'>
                                        {repository.incomeYear.from +
                                            ' - ' +
                                            repository.incomeYear.to}
                                    </span>
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className='grid'>
                            <span className='line-clamp-2'>
                                {repository.description}
                            </span>
                        </CardContent>
                        <Separator className='my-2' />
                        <CardFooter className='justify-end pb-2'>
                            <div className='flex space-x-2'>
                                <Link to={`/${repository.id}`}>
                                    <Button variant='default'>Enter</Button>
                                </Link>

                                <Button
                                    variant='destructive'
                                    type='button'
                                    onClick={() => onDelete(repository.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}
