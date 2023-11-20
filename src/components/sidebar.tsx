import { sideNavItems } from '@/configs/side-nav-items-config';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Sidebar({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <aside
            className={cn(
                className,
                'flex flex-col w-18 justify-between bg-card rounded-lg m-3 shadow-md'
            )}
            {...props}
        >
            <div className='flex flex-col items-center mt-2 px-2'>
                {sideNavItems.map((sideNavItem) => {
                    const Icon = sideNavItem.icon;
                    return (
                        <TooltipProvider key={sideNavItem.label}>
                            <Tooltip>
                                <TooltipTrigger>
                                    {' '}
                                    <NavLink to={sideNavItem.href}>
                                        {({ isActive }) => (
                                            <div
                                                className={cn(
                                                    'flex items-center justify-center w-8 h-8 mt-3 rounded-md hover:bg-primary/90 text-card-foreground hover:text-primary-foreground',
                                                    isActive &&
                                                        'bg-primary text-primary-foreground'
                                                )}
                                            >
                                                <Icon className='h-5 w-5' />
                                            </div>
                                        )}
                                    </NavLink>
                                </TooltipTrigger>
                                <TooltipContent side='right'>
                                    <p>{sideNavItem.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                })}
            </div>
        </aside>
    );
}
