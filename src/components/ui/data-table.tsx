import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    RowData,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useMemo, useState } from 'react';
import { DataTablePagination } from './data-table-pagination';
import { Button } from './button';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (
            rowIndex: number,
            columnId: keyof TData,
            value: TData[keyof TData]
        ) => void;
        addRow: () => void;
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    defaultRow: TData;
    updateDataCb: (data: TData[]) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    defaultRow,
    updateDataCb,
}: DataTableProps<TData, TValue>) {
    const tableData = useMemo(() => {
        return data;
    }, [data]);
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'startDate', desc: true },
    ]);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        meta: {
            updateData: (
                rowIndex: number,
                columnId: keyof TData,
                value: TData[keyof TData]
            ) => {
                updateDataCb(
                    data.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...data[rowIndex],
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
            },
            addRow: () => {
                updateDataCb([defaultRow, ...data]);
            },
        },
    });

    return (
        <div>
            <div className='my-2 flex justify-end'>
                <Button variant='outline' onClick={table.options.meta?.addRow}>
                    Add Row
                </Button>
            </div>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center'
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='mt-2'>
                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
