import React from 'react';
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import TabletFelvetel from './components/telefonFelvetel';
import TabletTorles from './components/telefonTorles';

import Kezdolap from './components/kezdolap';
import NewPhone from './components/telefonFelvetel';
import TelefonTorles from './components/telefonTorles';
import { TelefonRendezes } from './components/telefonRendezes';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Kezdolap />,
  },
  {
    path: "/tabletfelvetel",
    element: <NewPhone />,
  },
  {
    path: "/telefontorles",
    element: <TelefonTorles />,
  },
  {
    path:"/telefonrendezes",
    element: <TelefonRendezes/>
  }

]);


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
