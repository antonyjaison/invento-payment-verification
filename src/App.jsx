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

import UnverifiedPage from "./pages/UnverifiedPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import VerifiedPage from "./pages/VerifiedPage";
import { getUser } from "./utils/user";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getUser());
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="orders" >
          <Route path="unverified" element={<UnverifiedPage />} />
          <Route path="verified" element={<VerifiedPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
