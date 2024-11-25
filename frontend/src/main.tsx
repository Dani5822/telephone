import React from 'react';
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'

import Raktar from './components/raktar';


const router = createBrowserRouter([

  {
    path: "/raktar",
    element: <Raktar />,
  },
]);


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
