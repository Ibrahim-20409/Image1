import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router"; // ✅ Fix import
import "./App.css";
import Login from "./pages/Login.jsx";
import MenuLayout from "./components/MenuLayout.jsx";
import Missing from "./components/Missing.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import Users from "./pages/users/Users.jsx";
import Constellation from "./pages/constellation/Constellation.jsx";
import Monitoring from "./pages/monitoring/Monitoring.jsx";
import { NmeaProvider } from "./context/NmeaContext.jsx"; // ✅ Fix path

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <AuthProvider>
          <NmeaProvider>
            {" "}
            <div className="App">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route element={<MenuLayout />}>
                  <Route path="/constellation" element={<Constellation />} />
                  <Route path="/monitoring" element={<Monitoring />} />
                  <Route path="/users" element={<Users />} />
                </Route>
                <Route path="*" element={<Missing />} />
              </Routes>
            </div>
          </NmeaProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
