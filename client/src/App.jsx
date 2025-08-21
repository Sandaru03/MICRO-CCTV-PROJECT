import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/loginPage';
import RegisterPage from './Pages/registerPage'; 
import { Toaster } from "react-hot-toast";
import AdminPage from './Pages/adminPadge';
import TestPage from './Pages/admin/testPage';
import ClientWebPage from './Pages/customer/customerPage';

function App() {
  return (
    <Router>
      <Toaster position="top-right"/> 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/test" element={<TestPage/>}/>
        <Route path="/*" element={<ClientWebPage/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
