import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/loginPage';
import RegisterPage from './Pages/registerPage';  // <-- import properly

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
