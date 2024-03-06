import { DataTable } from '@/components/ui/data-table';
import { carUsageLogbookColumns } from '@/components/car-usage-logbook/columns';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { CarUsageLog, CarUsageMeta, Repository } from '@/types';
import { RecordService } from '@/services/record-service';

interface CarUsageLogbookProps {
    repository: Repository;
}

export default function CarUsageLogbook({ repository }: CarUsageLogbookProps) {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [engineCapacity, setEngineCapacity] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [tableData, setTableData] = useState<CarUsageLog[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const recordService = new RecordService();
            const data = await recordService.readCarUsageLogs(
                repository.name,
                repository.id
            );
            if (Array.isArray(data) && data.length > 0) {
                const [carUsageMeta, ...carUsageLogs] = data; // Destructure to get carUsageLogs and carUsageMeta
                setTableData(carUsageLogs); // Set tableData to carUsageLogs
                if (carUsageMeta) {
                    setMake(carUsageMeta.make);
                    setModel(carUsageMeta.model);
                    setEngineCapacity(carUsageMeta.engineCapacity);
                    setRegistrationNumber(carUsageMeta.registrationNumber);
                }
            } else {
                console.log('No data is available');
            }
        };

        fetchData();
    }, [repository.id, repository.name]);

    const saveCarUsageLogbook = async () => {
        const recordService = new RecordService();
        const carUsageMeta: CarUsageMeta = {
            make,
            model,
            engineCapacity,
            registrationNumber,
        };
        recordService.updateCarUsageLogs(repository.name, repository.id, [
            carUsageMeta,
            ...tableData,
        ]);
    };

    return (
        <Card>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div>
                    <CardTitle>Work Related Car Usage Logbook</CardTitle>
                    <CardDescription>
                        Make changes to your work related car usage logbook
                        here. Click save when you're done.
                    </CardDescription>
                </div>
                <Button onClick={saveCarUsageLogbook}>Save changes</Button>
            </CardHeader>
            <CardContent>
                <div className='grid grid-cols-2 gap-4 py-4 mb-6 border-b'>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label htmlFor='make'>Make</Label>
                        <Input
                            type='text'
                            id='make'
                            placeholder='Lexus'
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                        />
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label htmlFor='model'>Model</Label>
                        <Input
                            type='text'
                            id='model'
                            placeholder='SUV LX 500d'
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label htmlFor='engineCapacity'>Engine Capacity</Label>
                        <Input
                            type='text'
                            id='engineCapacity'
                            placeholder='3.3L Diesel'
                            value={engineCapacity}
                            onChange={(e) => setEngineCapacity(e.target.value)}
                        />
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label htmlFor='registrationNumber'>
                            Registration Number
                        </Label>
                        <Input
                            type='text'
                            id='registrationNumber'
                            placeholder='ABC123'
                            value={registrationNumber}
                            onChange={(e) =>
                                setRegistrationNumber(e.target.value)
                            }
                        />
                    </div>
                </div>
                <DataTable
                    columns={carUsageLogbookColumns}
                    data={tableData}
                    updateDataCb={setTableData}
                    defaultRow={{
                        startDate: new Date().toISOString().slice(0, 10),
                        endDate: new Date().toISOString().slice(0, 10),
                        startOdometer: 0,
                        endOdometer: 0,
                        workDistance: 0,
                        personalDistance: 0,
                        travelReason: '',
                    }}
                />
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}
