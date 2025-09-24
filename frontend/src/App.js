import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";

import PatientList from "./Patients/PatientList";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PatientList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
