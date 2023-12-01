import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { AppDispatch, useAppDispatch } from '@/redux/store';
import { addRepository } from '@/redux/slices/repositories-slice';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

const addRepositoryformSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(50, { message: 'Name cannot have more than 50 characters' }),
    incomeYear: z.object({
        from: z.date({ required_error: 'A from date is required' }),
        to: z.date({ required_error: 'A to date is required' }),
    }),
    description: z
        .string()
        .max(200, 'Description cannot exceed 200 characters'),
});

type AddRepositoryFormValues = z.infer<typeof addRepositoryformSchema>;

const defaultValues: Partial<AddRepositoryFormValues> = {
    name: '',
    incomeYear: {
        from: new Date(new Date().getFullYear(), 6, 1),
        to: new Date(new Date().getFullYear() + 1, 5, 30),
    },
    description: '',
};

export default function AddRepositoryDialog({
    children,
}: React.PropsWithChildren) {
    const dispatch: AppDispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    const form = useForm<AddRepositoryFormValues>({
        resolver: zodResolver(addRepositoryformSchema),
        defaultValues,
    });

    async function onSubmit(data: AddRepositoryFormValues) {
        console.log(data);
        dispatch(
            addRepository({
                repository: {
                    name: data.name,
                    description: data.description,
                    incomeYear: {
                        from: data.incomeYear.from.toLocaleDateString(),
                        to: data.incomeYear.to.toLocaleDateString(),
                    },
                    path: '',
                },
            })
        )
            .unwrap()
            .then((promisedResult) => {
                console.log(promisedResult);
                toast({
                    title: 'Congratulation!',
                    description: `Your repository ${promisedResult.name} has been added.`,
                });
                setOpen(false);
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add Repository</DialogTitle>
                            <DialogDescription>
                                Select the root directory for your repository.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Repository Name'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Name should be unique across all
                                                the repositories.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='incomeYear'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col'>
                                            <FormLabel>Income Year</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            id='incomeYear'
                                                            variant={'outline'}
                                                            className={cn(
                                                                'w-[300px] justify-start text-left font-normal',
                                                                !field.value &&
                                                                    'text-muted-foreground'
                                                            )}
                                                        >
                                                            {field.value
                                                                ?.from ? (
                                                                field.value
                                                                    ?.to ? (
                                                                    <>
                                                                        {format(
                                                                            field
                                                                                .value
                                                                                .from,
                                                                            'LLL dd, y'
                                                                        )}{' '}
                                                                        -{' '}
                                                                        {format(
                                                                            field
                                                                                .value
                                                                                .to,
                                                                            'LLL dd, y'
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    format(
                                                                        field
                                                                            .value
                                                                            .from,
                                                                        'LLL dd, y'
                                                                    )
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a range
                                                                </span>
                                                            )}
                                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className='w-auto p-0'
                                                    align='start'
                                                    side='bottom'
                                                >
                                                    <Calendar
                                                        mode='range'
                                                        defaultMonth={
                                                            field.value?.from
                                                        }
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        numberOfMonths={2}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                Income year period. Usually from
                                                1 July to 30 June.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className='resize-none'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                A brief description of this
                                                repository &#40;optional&#41;.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type='submit'>Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
