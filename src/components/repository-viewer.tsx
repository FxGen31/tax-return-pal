import { CalendarDays } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Repository } from '@/types';
import Breadcrumb from '@/components/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CarUsageLogbook from './car-usage-logbook/car-usage-logbook';
import { ScrollArea } from './ui/scroll-area';

interface RepositoryViewerProps {
    repository: Repository;
}

export default function RepositoryViewer({
    repository,
}: RepositoryViewerProps) {
    return (
        <div className='ml-5 mr-8 mt-6 flex flex-col'>
            <div className='flex items-center justify-between'>
                <div className='space-y-1.5'>
                    <Breadcrumb />
                    <h2 className='text-3xl font-semibold underline-offset-4 hover:underline'>
                        {repository.name}
                    </h2>
                    <p className='text-muted-foreground line-clamp-2 hover:line-clamp-none max-w-prose'>
                        {repository.description}
                    </p>
                </div>
                <div className='flex items-center'>
                    <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
                    <span className='text-md text-muted-foreground'>
                        {repository.incomeYear.from} -{' '}
                        {repository.incomeYear.to}
                    </span>
                </div>
            </div>

            <Separator className='my-4' />
            
            <Tabs defaultValue='general expenses' className='w-full'>
                {/* <ScrollArea className='w-96 whitespace-nowrap rounded-md border'>
                    <div className='flex w-max space-x-4 p-4'></div>
                </ScrollArea> */}
                <TabsList>
                    <TabsTrigger value='general expenses'>
                        General Expenses
                    </TabsTrigger>
                    <TabsTrigger value='work related car usage logbook'>
                        Work Related Car Usage Logbook
                    </TabsTrigger>
                    <TabsTrigger value='work related purchase'>
                        Work Related Purchase
                    </TabsTrigger>
                    <TabsTrigger value='work from home logbook'>
                        Work From Home Logbook
                    </TabsTrigger>
                    <TabsTrigger value='invoices'>Invoices</TabsTrigger>
                </TabsList>
                <ScrollArea className='h-[500px]'> <TabsContent value='general expenses'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save
                                when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-2'>
                            <div className='space-y-1'>
                                <Label htmlFor='name'>Name</Label>
                                <Input id='name' defaultValue='Pedro Duarte' />
                            </div>
                            <div className='space-y-1'>
                                <Label htmlFor='username'>Username</Label>
                                <Input id='username' defaultValue='@peduarte' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value='work related car usage logbook'>
                    <CarUsageLogbook repository={repository} />
                </TabsContent>
                <TabsContent value='work related purchase'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save
                                when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-2'>
                            <div className='space-y-1'>
                                <Label htmlFor='name'>Name</Label>
                                <Input id='name' defaultValue='Pedro Duarte' />
                            </div>
                            <div className='space-y-1'>
                                <Label htmlFor='username'>Username</Label>
                                <Input id='username' defaultValue='@peduarte' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value='work from home logbook'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll
                                be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-2'>
                            <div className='space-y-1'>
                                <Label htmlFor='current'>
                                    Current password
                                </Label>
                                <Input id='current' type='password' />
                            </div>
                            <div className='space-y-1'>
                                <Label htmlFor='new'>New password</Label>
                                <Input id='new' type='password' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value='invoices'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll
                                be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-2'>
                            <div className='space-y-1'>
                                <Label htmlFor='current'>
                                    Current password
                                </Label>
                                <Input id='current' type='password' />
                            </div>
                            <div className='space-y-1'>
                                <Label htmlFor='new'>New password</Label>
                                <Input id='new' type='password' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent></ScrollArea>
               
            </Tabs>
        </div>
    );
}
