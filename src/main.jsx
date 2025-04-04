import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./store/index";
import TasksPage from "./page/TasksPage/index";
import "./reset.css";
import "./main.css";
import AuthLoader from "./components/AuthLoader";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/tasks", element: <TasksPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthLoader />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
