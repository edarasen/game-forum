import './App.css'
import LandingPage from "./home/home";
import AboutPage from "./about/about";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
