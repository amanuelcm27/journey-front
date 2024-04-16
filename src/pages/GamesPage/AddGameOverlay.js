import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import LoadingCard from "./LoadingCard";
const AddGameOverlay = ({ showOverlay, fetchData }) => {
  const [searchResults, setSearchResults] = useState([]);
  const hasPageBeenRendered = useRef(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const key = process.env.REACT_APP_RAWG_KEY
  const fetchGame = async () => {
    setLoading(true)
    const endPoint = `https://api.rawg.io/api/games?key=1be3562e62a244c4a6bfd6dbea03b151&search=${submittedTerm}`;
    const response = await axios.get(endPoint);
    setSearchResults(response.data.results);
    setLoading(false);
  };
  const [addGameResponse, setaddGameResponse] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const showResponse = () => {
    setShowDiv(true);
    setTimeout(() => {
      setShowDiv(false);
    }, 2000);
  };
  const addGame = async (data) => {
    const detailEndpoint = `https://api.rawg.io/api/games/${data.id}?key=1be3562e62a244c4a6bfd6dbea03b151`;
    const fetchDetails = async () => {
      const response = await axios.get(detailEndpoint);
      return response.data.description_raw;
    };
    const { name: title, background_image: image } = data;
    const { name: genre } = data.genres[0];
    const description = await fetchDetails();
    const structuredData = { title, image, genre, description };
    axios
      .post("https://amanuelf.pythonanywhere.com/api/add_game/", structuredData)
      .then((response) => {
        setaddGameResponse(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    fetchData();
    console.log("addGame executed");
  };
  useEffect(() => {
    if (hasPageBeenRendered.current) {
      fetchGame();
    }
    hasPageBeenRendered.current = true;
  }, [submittedTerm]);

  return (
    <div className="main-overlay">
      {showDiv && (
        <div className="notify-overlay">
          <div className="notify-msg">
            <span className="notify-msg">{addGameResponse.message}</span>
          </div>
        </div>
      )}

      <div className="overlay-container">
        <div onClick={showOverlay} className="close-overlay">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="overlay-heading">
          <div className="heading-text">
            <span>Search for the next Journey</span>
          </div>
          <div className="search-form-container">
            <form
              className="new-search-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmittedSearch(searchTerm);
              }}
            >
              <input
                placeholder="search for the best ... "
                className="new-game-input"
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn-ol">Search</button>
            </form>
          </div>
        </div>
        <div className="new-game-results">
          <div className="result-cards">
            {loading ? (
              <div >
                <LoadingCard />
              </div>
            ) : (
              searchResults.map((game) => (
                <div key={game.id} className="result-card">
                  <img
                    className="result-img"
                    src={game.background_image || <Skeleton />}
                    alt="game image"
                  />
                  <div className="result-content">
                    <div className="result-text">
                      <span style={{ paddingRight: "10px" }}>{game.name} </span>

                      <button
                        onClick={() => {
                          addGame(game);
                          showResponse();
                        }}
                        className="add-game-btn"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddGameOverlay;
