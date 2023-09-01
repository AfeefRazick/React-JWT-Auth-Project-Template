import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { Error } from "./pages/Error/Error";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home/Home";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Admin } from "./pages/Admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pages that need layout */}
        <Route element={<Layout />}>
          {/* pages that do not require authentication */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* pages that require authentication */}
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>

        {/* pages without layout */}
        <Route path="/unauthorized" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
