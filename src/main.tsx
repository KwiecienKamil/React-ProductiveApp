import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/Login.tsx";
import { Toaster } from "sonner";
import { Providers } from "./services/state/provider.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
