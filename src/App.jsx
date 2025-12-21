import { RouterProvider } from 'react-router/dom';
import { createBrowserRouter } from 'react-router';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Error from './ui/Error';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import ProtectedRoute from './ui/ProtectedRoute';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as makeOrderPriorityAction } from './features/order/UpdateOrderPriority';

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            { path: '/', element: <Home /> },
            { path: '/menu', element: <Menu />, loader: menuLoader },
            { path: '/cart', element: <Cart /> },
            {
              path: '/order/new',
              element: <CreateOrder />,
              action: createOrderAction,
            },
            {
              path: '/order/:id',
              element: <Order />,
              loader: orderLoader,
              errorElement: <Error />,
              action: makeOrderPriorityAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
