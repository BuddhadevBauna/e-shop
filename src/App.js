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
import Cart from './pages/product/Cart';
import ProductRoot from './pages/product/ProductRoot';
import AllProduct from './components/Products/allProducts/AllProduct';
import ProductDetails from './components/Products/ProductDetails/ProductDetails';
import ProductsOfCategoryContainer from './components/Products/productsOfCategory/ProductOfCategoryContainer';


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
          { path: "category/:particularCategory", element: <ProductsOfCategoryContainer /> },
          { path: ":productId", element: <ProductDetails /> }
        ]
      },
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
