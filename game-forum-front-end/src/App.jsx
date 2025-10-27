import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import DataProvider from './context/DataProvider';
import Login from './pages/Login/Login';
import Test from './pages/Test/Test'
import LandingPage from "./home/home";
import AboutPage from "./about/about";
import NotFound from './pages/NotFound/NotFound';
import ForumMain from './pages/ForumMain/ForumMain';
import Channel from './pages/Channel/Channel';
import MyPosts from './pages/MyPosts/MyPosts';
import Signup from './pages/SignUp/SignUp';
import LatestPosts from './pages/LatestPosts/LatestPosts';
import SearchResults from './pages/SearchResults/SearchResults';
import MyProfile from './pages/MyProfile/MyProfile';
import Post from './pages/Post/Post';
import PostCreate from './pages/PostCreate/PostCreate'

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

  const { channel_id } = useParams();

  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/">
              <Route index element={<LandingPage onLogout={handleLogout} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="forums"
                element={<ForumMain onLogout={handleLogout} />}
              />
              <Route
                path="channels/:channel_id"
                element={<Channel onLogout={handleLogout} />}
              />
              <Route path="permissions-test" element={<Test />} />
              <Route
                path="login-test"
                element={<Login onLogin={handleLogin} />}
              />
              <Route path="my-posts" element={<MyPosts />} />
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="sign-up" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="latest"
                element={<LatestPosts onLogout={handleLogout} />}
              />
              <Route
                path="search"
                element={<SearchResults onLogout={handleLogout} />}
              />
              <Route
                path="/channels/:channel_id/posts/new"
                element={<PostCreate />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App
