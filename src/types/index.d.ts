export interface Repository {
    id: string;
    name: string;
    incomeYear: {
        from: string;
        to: string;
    };
    description: string;
    path: string;
}

export type CarUsageLog = {
    startDate: string;
    endDate: string;
    startOdometer: number;
    endOdometer: number;
    workDistance: number;
    personalDistance: number;
    travelReason: string;
}

export type CarUsageMeta = {
    make: string;
    model: string;
    engineCapacity: string;
    registrationNumber: string;
}
