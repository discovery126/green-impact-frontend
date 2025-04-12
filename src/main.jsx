import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./store/index";
import TasksPage from "./page/TasksPage/index";
import RewardsPage from "./page/RewardsPage/index";
import "./reset.css";
import "./main.css";
import AuthLoader from "./components/AuthLoader";
import { ToastContainer } from "react-toastify";
import RatingPage from "./page/RatingPage";
import EventsPage from "./page/EventsPage";
import ProfilePage from "./page/ProfilePage";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/tasks", element: <TasksPage /> },
  { path: "/rewards", element: <RewardsPage /> },
  { path: "/rating", element: <RatingPage /> },
  { path: "/events", element: <EventsPage /> },
  { path: "/profile", element: <ProfilePage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer
      className="Toastify__toast-container"
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnHover
      theme="light"
      limit={4}
    />
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
        <AuthLoader />
      </Provider>
    </React.StrictMode>
  </>
);
