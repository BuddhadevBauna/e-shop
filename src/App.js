import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//---pages
import Root from './pages/Root';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductCategoryView from './components/Products/productsOfCategory/ProductCategoryView';
import ProductRoot from './pages/ProductRoot';
import AllProduct from './pages/AllProduct';

const router = createBrowserRouter([
  {
    path: "/", element: <Root />,
    children: [
      { path: '', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      {
        path: "products", element: <ProductRoot />,
        children: [
          { path: "", element: <AllProduct /> },
          { path: "category/:particularCategory", element: <ProductCategoryView /> }
        ]
      },
      // { path: 'products', element: <Products />},
      // { path : 'products/category/:particularCategory', element: <ProductCategoryView /> },
      { path: 'cart', element: <Cart /> }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
