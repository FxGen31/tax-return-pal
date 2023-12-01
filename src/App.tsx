import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/pages/layouts/root';
import HomePage from '@/pages/home';
import ThemeProvider from '@/components/theme-provider';
import { useEffect } from 'react';
import { RepositoryService } from '@/services/repository-service';
import { store } from '@/redux/store';
import { Toaster } from '@/components/ui/toaster';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
        ],
    },
]);

function App() {
    useEffect(() => {
        const appInit = async () => {
            await new RepositoryService().folderCreationOnFirstAppLaunch();
        };
        appInit();
    }, []);

    return (
        <>
            <Provider store={store}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    <RouterProvider router={router} />
                </ThemeProvider>
            </Provider>

            <Toaster />
        </>
    );
}

export default App;
