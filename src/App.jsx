import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  redirect,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import "./globals.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { getUser } from "./utils/user";

function App() {
  const user = getUser();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/login"
          element={user.length > 0 ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={user.length > 0 ? <HomePage /> : <Navigate to="login" />}
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
