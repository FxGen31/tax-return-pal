import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { RepositoryService } from '@/services/repository-service';
import { AppDispatch, useAppDispatch } from '@/redux/store';
import { initRepositories } from '@/redux/slices/repositories-slice';
import RootLayout from '@/pages/layouts/root';
import HomePage from '@/pages/home';
import { Toaster } from '@/components/ui/toaster';
import ThemeProvider from '@/components/theme-provider';
import RepositoryPage from '@/pages/repository';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: '/:repositoryId',
                element: <RepositoryPage />,
            },
        ],
    },
]);

function App() {
    const dispatch: AppDispatch = useAppDispatch();
    useEffect(() => {
        const appInit = async () => {
            await new RepositoryService().folderCreationOnFirstAppLaunch();
            dispatch(initRepositories());
        };
        appInit();
    }, [dispatch]);

    return (
        <>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
            >
                <RouterProvider router={router} />
            </ThemeProvider>
            <Toaster />
        </>
    );
}

export default App;
