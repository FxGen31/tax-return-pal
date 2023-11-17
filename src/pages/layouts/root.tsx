import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <div className='flex flex-col h-screen overflow-clip'>
            <div className='grow flex flex-row bg-background min-h-[400px] min-w-[960px]'>
                <main className='flex flex-col flex-grow w-full'>
                    <div className='overflow-auto'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
