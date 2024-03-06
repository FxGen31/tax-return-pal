import {
    HomeIcon,
    LucideIcon,
    ReceiptIcon,
    ScrollIcon,
    TablePropertiesIcon,
} from 'lucide-react';

interface SideNavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

// Application navigation items
export const sideNavItems: SideNavItem[] = [
    {
        label: 'Home',
        href: '/',
        icon: HomeIcon,
    },
    {
        label: 'Guide',
        href: '/guide',
        icon: ScrollIcon,
    },
    {
        label: 'Logbooks',
        href: '/logbooks',
        icon: TablePropertiesIcon,
    },
    {
        label: 'Receipts',
        href: '/receipts',
        icon: ReceiptIcon,
    },
];
