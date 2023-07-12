import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserTickets from "../pages/user/UserTickets";
import RootLayout from "../pages/layout/RootLayout";
import CreateUserTicket from "../pages/user/CreateUserTicket";
import UserRootLayout from "../pages/layout/UserRootLayout";
import Unauthorized from "../components/Unauthorized";
import ViewTicketDetails from "../pages/user/ViewTicketDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<h1>This page does not exist</h1>} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="user" element={<UserRootLayout />}>
        <Route path=":user_id">
          <Route path="tickets" element={<UserTickets />} />
          <Route path="create_ticket" element={<CreateUserTicket />} />
        </Route>
        <Route
          path="ticket_details/:ticket_id"
          element={<ViewTicketDetails />}
        />
      </Route>
    </Route>
  )
);

export default router;
