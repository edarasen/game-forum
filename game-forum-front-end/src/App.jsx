import './App.css'
import DataProvider from './context/DataProvider';
import Login from './pages/Login/Login';
import Test from './pages/Test/Test'
import LandingPage from "./home/home";
import AboutPage from "./about/about";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/permissions-test" replace/> : <Login onLogin={handleLogin} /> }/>
            <Route path="/permissions-test" element={<Test />}/>
            <Route path="/">
              <Route index element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App
