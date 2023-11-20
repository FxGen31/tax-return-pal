import Sidebar from '@/components/sidebar';
import TitleBar from '@/components/title-bar';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <div className='flex flex-col h-screen overflow-clip'>
            <TitleBar />
            <div className='grow flex flex-row bg-background min-h-[400px] min-w-[960px]'>
                <Sidebar />
                <main className='flex flex-col flex-grow w-full'>
                    <div className='overflow-auto'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
