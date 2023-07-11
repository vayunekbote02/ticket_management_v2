import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RootLayout from "../pages/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<h1>This page does not exist</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/user/:userId/tickets"
        element={<h2>These are the users tickets.</h2>}
      />
    </Route>
  )
);

export default router;
