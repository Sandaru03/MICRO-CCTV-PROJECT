import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/loginPage';
import RegisterPage from './Pages/registerPage'; 
import HomePage from './Pages/homePage';
import { Toaster } from "react-hot-toast";
import AdminPage from './Pages/adminPadge';
import TestPage from './Pages/admin/testPage';

function App() {
  return (
    <Router>
      <Toaster position="top-right"/> 
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/test" element={<TestPage/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
