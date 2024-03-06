import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Toggle light/dark theme
export default function ThemeToggler({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const { setTheme, theme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState('light');

    // Delay rendering any theme toggling UI until mounted on the client to be hydration safe
    useEffect(() => {
        if (theme) setCurrentTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        if (currentTheme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <div
            className={cn(
                className,
                'h-10 border flex justify-center items-center rounded-xl'
            )}
            {...props}
        >
            <Button
                className={cn(
                    'h-8 ml-1 mr-0.5 rounded-lg',
                    currentTheme === 'dark' &&
                        'hover:text-primary-foreground text-muted-foreground bg-card'
                )}
                onClick={() => toggleTheme()}
            >
                <Sun className='mr-1.5 h-4 w-4' />
                <span>Light</span>
            </Button>
            <Button
                className={cn(
                    'h-8 ml-0.5 mr-1 rounded-lg',
                    currentTheme === 'light' &&
                        'hover:text-primary-foreground text-muted-foreground bg-card'
                )}
                onClick={() => toggleTheme()}
            >
                <Moon className='mr-1.5 h-4 w-4' />
                <span>Dark</span>
            </Button>
        </div>
    );
}
