import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ClosedProcesses from './pages/ClosedProcesses';
import HomePage from './pages/HomePage';
import Networking from './pages/Networking';
import OpenProcesses from './pages/OpenProcesses';
import PendingProcesses from './pages/PendingProcesses';
import PositionPage from './pages/PositionPage';
import RootPage from './pages/RootPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "positions/:positionId",
        element: <PositionPage />
      },
      {
        path: "positions/new-position",
        element: <PositionPage />
      },
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "pending-processes",
            element: <PendingProcesses />,
          },
          {
            path: "open-processes",
            element: <OpenProcesses />
          },
          {
            path: "closed-processes",
            element: <ClosedProcesses />
          },
          {
            path: "networking",
            element: <Networking />
          },
        ],
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

