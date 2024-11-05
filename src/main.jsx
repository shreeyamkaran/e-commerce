import { createRoot } from 'react-dom/client';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/auth",
        element: <Login />
    },
    {
        path: "/products/:id",
        element: <Product />
    },
    {
        path: "/cart",
        element: <Cart />
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]);

createRoot(document.getElementById('root')).render(
    <Provider store={ store }>
        <RouterProvider router={ router } />
        <Toaster />
    </Provider>
);