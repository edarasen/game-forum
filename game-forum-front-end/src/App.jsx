import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import DataProvider from './context/DataProvider';
import Login from './pages/Login/Login';
import Test from './pages/Test/Test'
import LandingPage from "./home/home";
import AboutPage from "./about/about";
import NotFound from './pages/NotFound/NotFound';
import ForumMain from './pages/ForumMain/ForumMain';
import Channel from './pages/Channel/Channel';
import Signup from './pages/SignUp/SignUp';
import LatestPosts from './pages/LatestPosts/LatestPosts';
import SearchResults from './pages/SearchResults/SearchResults';

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
              <Route index element={<LandingPage/>} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="forums" element={<ForumMain onLogout={handleLogout}/>} />
              <Route path="channels/:channel_id" element={<Channel onLogout={handleLogout}/>}/>
              <Route path="permissions-test" element={<Test />}/>
              <Route path="login-test" element={<Login onLogin={handleLogin} />}/>
              <Route path="sign-up" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
              <Route path="latest" element={<LatestPosts onLogout={handleLogout}/>}/>
              <Route path="search" element={<SearchResults onLogout={handleLogout}/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App
