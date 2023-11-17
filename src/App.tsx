import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/pages/layouts/root';
import HomePage from '@/pages/home';

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
            <RouterProvider router={router} />
        </>
    );
}

export default App;
