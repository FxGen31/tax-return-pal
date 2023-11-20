import { appWindow } from '@tauri-apps/api/window';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Github, Maximize, Minus, Settings, X } from 'lucide-react';
import ThemeToggler from '@/components/theme-toggler';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

export default function TitleBar() {
    const [isHovering, setIsHovering] = useState(false);

    // Minimize the Tauri window
    const minimizeWindow = useCallback(async () => {
        appWindow.minimize();
    }, []);

    // Maximize the Tauri window
    const maximizeWindow = useCallback(async () => {
        const isMaximized = await appWindow.isMaximized();
        if (isMaximized) {
            appWindow.unmaximize();
        } else {
            appWindow.maximize();
        }
    }, []);

    // Close the Tauri window
    const closeWindow = useCallback(async () => {
        appWindow.close();
    }, []);

    return (
        <div
            className='flex justify-between items-center bg-card'
            data-tauri-drag-region
        >
            <div className='flex items-center'>
                <div
                    className='flex items-center justify-center space-x-3 pl-4 pr-2'
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div
                        className={cn(
                            'h-4 w-4 flex justify-center items-center rounded-full',
                            isHovering ? 'bg-[#FF605C]' : 'bg-slate-300'
                        )}
                        onClick={closeWindow}
                    >
                        <X
                            className={cn(
                                'h-2 w-2',
                                isHovering ? 'text-red-900' : 'text-slate-300'
                            )}
                            strokeWidth={3}
                        />
                    </div>
                    <div
                        className={cn(
                            'h-4 w-4 flex justify-center items-center rounded-full',
                            isHovering ? 'bg-[#FFBD44]' : 'bg-slate-300'
                        )}
                        onClick={minimizeWindow}
                    >
                        <Minus
                            className={cn(
                                'h-2 w-2',
                                isHovering
                                    ? 'text-yellow-900'
                                    : 'text-slate-300'
                            )}
                            strokeWidth={3}
                        />
                    </div>
                    <div
                        className={cn(
                            'h-4 w-4 flex justify-center items-center rounded-full',
                            isHovering ? 'bg-[#00CA4E]' : 'bg-slate-300'
                        )}
                        onClick={maximizeWindow}
                    >
                        <Maximize
                            className={cn(
                                'h-2 w-2',
                                isHovering ? 'text-green-900' : 'text-slate-300'
                            )}
                            strokeWidth={3}
                        />
                    </div>
                </div>
                <Menubar className='rounded-none border-b border-none bg-card'>
                    <MenubarMenu>
                        <MenubarTrigger className='font-bold whitespace-nowrap'>
                            Tax Return Pal
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>About TRP</MenubarItem>
                            <MenubarItem>Exit</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Documentation</MenubarItem>
                            <MenubarItem>View License</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>
                                Github{' '}
                                <MenubarShortcut>
                                    <Github className='h-4 w-4' />
                                </MenubarShortcut>{' '}
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarSub>
                                <MenubarSubTrigger>Author</MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem>Github</MenubarItem>
                                    <MenubarItem>Linkedin</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className='relative'>
                            File
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarSub>
                                <MenubarSubTrigger>New</MenubarSubTrigger>
                                <MenubarSubContent className='w-[230px]'>
                                    <MenubarItem>Logbook...</MenubarItem>
                                    <MenubarItem disabled>
                                        Storage...
                                    </MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarSeparator />
                            <MenubarItem>Open Storage...</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Import Logbook...</MenubarItem>
                            <MenubarItem>Upload Receipt...</MenubarItem>
                            <MenubarSub>
                                <MenubarSubTrigger>Share</MenubarSubTrigger>
                                <MenubarSubContent className='w-[230px]'>
                                    <MenubarItem>Export Logbook...</MenubarItem>
                                    <MenubarItem disabled>
                                        Download Receipt...
                                    </MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Account</MenubarTrigger>
                        <MenubarContent forceMount>
                            <MenubarLabel inset>Switch Account</MenubarLabel>
                            <MenubarSeparator />
                            <MenubarRadioGroup value='benoit'>
                                <MenubarRadioItem value='andy'>
                                    Andy
                                </MenubarRadioItem>
                                <MenubarRadioItem value='benoit'>
                                    Benoit
                                </MenubarRadioItem>
                                <MenubarRadioItem value='Luis'>
                                    Luis
                                </MenubarRadioItem>
                            </MenubarRadioGroup>
                            <MenubarSeparator />
                            <MenubarItem inset>Add Account...</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Help</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Tips</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Report Issue</MenubarItem>
                            <MenubarItem>Request Feature</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
            <div className='flex items-center px-4 space-x-3'>
                <NavLink to='/settings'>
                    {({ isActive }) => (
                        <div
                            className={cn(
                                'flex items-center justify-center w-8 h-8 rounded-md hover:bg-primary/90 text-card-foreground hover:text-primary-foreground',
                                isActive && 'bg-primary text-primary-foreground'
                            )}
                        >
                            <Settings className='h-5 w-5' />
                        </div>
                    )}
                </NavLink>
                <ThemeToggler />
            </div>
        </div>
    );
}
