export interface Repository {
    name: string;
    incomeYear: {
        from: string;
        to: string;
    };
    description: string;
    path: string;
}
