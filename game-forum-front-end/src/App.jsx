import './App.css'
import DataProvider from './context/DataProvider';
import Login from './pages/Login/Login';
import Test from './pages/Test/Test'
import LandingPage from "./home/home";
import AboutPage from "./about/about";
import NotFound from './pages/NotFound/NotFound';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import ForumMain from './pages/ForumMain/ForumMain';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = (status) => {
    console.log('Hello!')
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    console.log('Bye!')
    setIsAuthenticated(false);
  };

  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace/> : <Login onLogin={handleLogin} /> }/>
            <Route path="/">
              <Route index element={<ForumMain onLogout={handleLogout}/>} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="forums" element={<ForumMain onLogout={handleLogout}/>} />
              <Route path="permissions-test" element={<Test />}/>
              <Route path="login-test" element={<Login onLogin={handleLogin} />}/>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App
