import React from 'react';
import Jobs from './pages/Jobs';
import Todos from './pages/Todos';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import RootPage from './pages/RootPage';
import PositionPage from './pages/PositionPage';
import DashBoardPage from './pages/DashboardPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


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
            path: "/",
            element: <DashBoardPage />
          },
          {
            path: "jobs",
            element: <Jobs />,
          },
          {
            path: "todos",
            element: <Todos />
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

