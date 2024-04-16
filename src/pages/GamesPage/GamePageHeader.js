import { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios'

const GamePageHeader = ({
    filterGameList,
    filterState,
    setGameList,
    searchTerm,
    setSearchTerm,
  }) => {
    const hasPageBeenRendered = useRef(false);
    const scrollToTarget = () => {
      const targetDiv = document.getElementById("filter");
      if (targetDiv) {
        window.scrollTo({
          top: targetDiv.offsetTop,
          behavior: "smooth",
        });
      }
    };
    const searchGame = async () => {
      const response = await axios.get(
        `https://journeysofaman.vercel.app/api/search_games/?search=${searchTerm}`
      );
      setGameList(response.data);
    };
    useEffect(() => {
      if (hasPageBeenRendered.current) {
        searchGame();
      }
      hasPageBeenRendered.current = true;
    }, [searchTerm]);
    return (
      <div className="game-overlay">
        <div className="game-header-content">
          <div className="game-header-text">
            <span>Explore Games I have Played So far</span>
          </div>
          <div className="game-search">
            <form
              id="search"
              className="search-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="search for games ..."
                className="search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-hold">
                <button
                  onClick={() => {
                    searchGame();
                    scrollToTarget();
                  }}
                  className="search-btn"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  export default GamePageHeader;