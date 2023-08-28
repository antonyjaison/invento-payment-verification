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
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getUser());
  }, []);
  console.log(user);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={<HomePage />}
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
