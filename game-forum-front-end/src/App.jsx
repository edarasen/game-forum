import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import DataProvider from "./context/DataProvider";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/home/home";
import NotFound from "./pages/NotFound/NotFound";
import ForumMain from "./pages/ForumMain/ForumMain";
import Channel from "./pages/Channel/Channel";
import MyPosts from "./pages/MyPosts/MyPosts";
import Signup from "./pages/SignUp/SignUp";
import LatestPosts from "./pages/LatestPosts/LatestPosts";
import SearchResults from "./pages/SearchResults/SearchResults";
import MyProfile from "./pages/MyProfile/MyProfile";
import PostCreate from "./pages/PostCreate/PostCreate";
import PostView from "./pages/PostView/Postview";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <DataProvider setAppAuth={setIsAuthenticated}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/">
            <Route
              index
              element={
                <LandingPage />
              }
            />
            <Route
              path="forums"
              element={
                <ForumMain />
              }
            />
            <Route
              path="channels/:channel_id"
              element={
                <Channel />
              }
            />
            <Route
              path="/channels/posts/new"
              element={
                <PostCreate />
              }
            />
            {/* <Route path="permissions-test" element={<Test />} /> */}
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="my-posts"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MyPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/posts/:id" element={<PostView />} />
            <Route
              path="sign-up"
              element={<Signup />}
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="latest"
              element={
                <LatestPosts />
              }
            />
            <Route
              path="search"
              element={
                <SearchResults />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
