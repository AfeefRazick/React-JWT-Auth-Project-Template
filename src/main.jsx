import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import { PersistentLogin } from "./components/PersistentLogin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PersistentLogin>
        <App />
      </PersistentLogin>
    </AuthProvider>
  </StrictMode>
);
