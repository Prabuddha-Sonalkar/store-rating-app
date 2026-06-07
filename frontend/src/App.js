import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboard
from "./pages/admin/AdminDashboard";

import StoreList
from "./pages/user/StoreList";

import OwnerDashboard
from "./pages/owner/OwnerDashboard";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/admin"
          element={
            <AdminDashboard />
          }
        />

        <Route
          path="/stores"
          element={
            <StoreList />
          }
        />

        <Route
          path="/owner"
          element={
            <OwnerDashboard />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;