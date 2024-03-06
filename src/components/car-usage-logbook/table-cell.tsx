/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function TableCell({ getValue, row, column, table }: any) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    const onBlur = () => {
        tableMeta?.updateData(row.index, column.id, value);
    };
    return columnMeta?.type === 'textarea' ? (
        <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
        />
    ) : (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            type={columnMeta?.type || 'text'}
        />
    );
}
