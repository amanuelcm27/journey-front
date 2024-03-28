import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import GamesPage from "./pages/GamesPage/GamesPage";
import GameDetail from "./pages/DetailPage/GameDetail";
import { SkeletonTheme } from "react-loading-skeleton";
function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/all_games/" element={<GamesPage />}></Route>
            <Route path="/detail/:game_id/" element={<GameDetail />}></Route>
            <Route path="*" element={<HomePage></HomePage>}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
