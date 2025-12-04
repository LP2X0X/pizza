import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Error from "./ui/Error";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/menu", element: <Menu />, loader: menuLoader },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
