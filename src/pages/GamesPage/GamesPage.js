import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./css/main_game.css";
import "./css/wishlist.css";
import "./css/add_overlay.css";
import "./css/gamesHeader.css";
import "./css/results.css";
import "./css/deleteModal.css";
import axios from "axios";
import AddGameOverlay from "./AddGameOverlay";
import AddWishListOverlay from "./AddWishListOverlay";
import WishListSideBar from "./WishLIstSideBar";
import DeleteCard from "./DeleteCard";
import FilterBar from "./FilterBar";
import FloatingIcons from "./FloatingIcons";
import GamePageHeader from "./GamePageHeader";
import ResultsCard from "./ResultsCard";


const GamesPage = () => {
  const [isShowMain, setShowMain] = useState(true);
  const [overlay, setOverlay] = useState("");
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [gameToBeDeleted, setGameToBeDeleted] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setfilterState] = useState("all");
  const [genreState, setGenreState] = useState("all");
  const [showWishList, setShowWishList] = useState("wishlist-container-hide");
  const [GameList, setGameList] = useState([]);
  const showOverlay = (choice) => {
    setShowMain(!isShowMain);
    setOverlay(choice);
  };
  const showDeleteOverlay = (game) => {
    setDeleteOverlay(!deleteOverlay);
    setGameToBeDeleted(game);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/all_games/");
      setGameList(response.data.games);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const filterGameList = async (method, genreOption) => {
    const response = await axios.get(
      `http://localhost:8000/api/filter/${method.toLowerCase()}/${genreOption}/`
    );
    setGameList(response.data);
    setfilterState(method);
    setGenreState(genreOption);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isShowMain ? (
        <>
          <WishListSideBar
            setShowWishList={setShowWishList}
            showWishList={showWishList}
          />
          <DeleteCard
            game={gameToBeDeleted}
            state={deleteOverlay}
            setDeleteOverlay={setDeleteOverlay}
            fetchData={fetchData}
          />
          <div className="wrapper">
            <Navbar />
            <div className="main-container">
              <div className="game-container">
                <FloatingIcons
                  showOverlay={showOverlay}
                  setShowWishList={setShowWishList}
                />
                <GamePageHeader
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setGameList={setGameList}
                  filterState={filterState}
                  setfilterState={setfilterState}
                />
              </div>
              <FilterBar filterGameList={filterGameList} />
              <ResultsCard
                filterGameList={filterGameList}
                GameList={GameList}
                searchTerm={searchTerm}
                showDeleteOverlay={showDeleteOverlay}
                filterState={filterState}
                setGenreState={setGenreState}
                genreState={genreState}
              />
            </div>
            <Footer />
          </div>
        </>
      ) : overlay === "add" ? (
        <AddGameOverlay showOverlay={showOverlay} fetchData={fetchData} />
      ) : (
        <AddWishListOverlay showOverlay={showOverlay} />
      )}
    </>
  );
};
export default GamesPage;
