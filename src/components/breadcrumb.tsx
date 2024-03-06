import { cn, hypenToTitleCase } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumb() {
    const location = useLocation();

    const getBreadcrumb = (): JSX.Element => {
        const paths = location.pathname.split('/').filter(Boolean);
        const trailing = paths.map((path, index) => {
            const cumulativePath = ['']
                .concat(paths.slice(0, index + 1))
                .join('/'); // Build the cumulative path
            return (
                <React.Fragment key={`breadcrumb-${index}`}>
                    <ChevronRight className='h-5 w-5' />
                    <div
                        className={cn(
                            'truncate',
                            index === paths.length - 1 && 'text-foreground'
                        )}
                    >
                        <Link to={cumulativePath}>
                            {hypenToTitleCase(path)}
                        </Link>
                    </div>
                </React.Fragment>
            );
        });
        return (
            <>
                <div
                    className={cn(
                        'truncate',
                        location.pathname.split('/').filter(Boolean).length <
                            1 && 'text-foreground truncate'
                    )}
                >
                    <Link to='/'>Home</Link>
                </div>
                {trailing}
            </>
        );
    };

    return (
        <div className='flex items-center space-x-2 text-muted-foreground font-medium'>
            {getBreadcrumb()}
        </div>
    );
}
