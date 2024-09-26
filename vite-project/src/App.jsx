import { Children, useState } from 'react'
import './App.css'
import Product from './assets/components/Product/product.jsx'
import About from './assets/components/About/about.jsx'
import Layout from './assets/components/pages/layout/layout.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Productview from './assets/components/Product/productview.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
          path: "products",
          element: <Product />,
      },
      {
          path: "products/:id",
          element: <Productview/>,
        },
      

    ],
  },
  {
    path: "products",
    element: <Product />,
  },
  {
    path: "products/:id",
    element: <Productview/>,
  },
]);


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
