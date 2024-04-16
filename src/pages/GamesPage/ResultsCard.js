import { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const ResultsCard = ({
    filterGameList,
    searchTerm,
    GameList,
    showDeleteOverlay,
    filterState,
    genreState
  }) => {
    const [visibleGames, setVisibleGames]  = useState(5);
    const totalGames = GameList.length;
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      });
      const hiddenElements = document.querySelectorAll(".hidden");
      hiddenElements.forEach((element) => observer.observe(element));
    }, [visibleGames,GameList]);
    const addToFavourite = async (game, favouriteState) => {
      const updatedFavourite = { favourite: favouriteState };
      try {
        const response = await axios.patch(
          `https://journeysofaman.vercel.app/api/mark_favourite/${game.id}/`,
          updatedFavourite
        );
        filterGameList(filterState,genreState);
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <div id="results" className="search-results">
        <div className="search-card-container">
          <span className="filter-state">{filterState ==="genre" ? genreState : filterState}</span>
          {GameList.length > 0 ? (
            GameList.slice(0,visibleGames).map((game) => (
              <div key={game.id} className="hidden game-card">
                <img className="card-img" src={game.image} />
                <div className="card-text">
                  <Link style={{ color: "white" }} to={`/detail/${game.id}`}>
                    <span>{game.title}</span>
                  </Link>
                  <span className="genre-dis">
                    {game.genre}
                    <i
                      onClick={() => showDeleteOverlay(game)}
                      className="fa-solid fa-trash"
                      title="delete"
                    ></i>
                    {game.favourite ? (
                      <i
                        onClick={() => {
                          addToFavourite(game, !game.favourite);
                        }}
                        style={{ color: "red", paddingRight: "20px" }}
                        className="fa-solid fa-star"
                        title="favourite"
                      ></i>
                    ) : (
                      <i
                        onClick={() => addToFavourite(game, !game.favourite)}
                        style={{ paddingRight: "20px" }}
                        className="fa-solid fa-star"
                      ></i>
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="game-card">
              <div className="card-text">
                <Link style={{ textAlign: "center", color: "white" }}>
                  <span>You haven't played  <span style={{color:"red"}}>{searchTerm}</span> Yet</span>
                </Link>
              </div>
            </div>
          )}
          {visibleGames < totalGames && <div className="view-more"><button className="view-more-btn" onClick={()=> setVisibleGames(visibleGames + 5)}>View More</button></div>}
        </div>
      </div>
    );
  };
  export default ResultsCard;