import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/pages/layouts/root';
import HomePage from '@/pages/home';
import ThemeProvider from '@/components/theme-provider';

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
    return (
        <>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
            >
                {' '}
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    );
}

export default App;
