import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import LoadingCard from "./LoadingCard";
const AddWishListOverlay = ({ showOverlay }) => {
  const [searchResults, setSearchResults] = useState([]);
  const hasPageBeenRendered = useRef(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [addGameResponse, setaddGameResponse] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const key = process.env.REACT_APP_RAWG_KEY

  const showResponse = () => {
    setShowDiv(true);
    setTimeout(() => {
      setShowDiv(false);
    }, 2000);
  };
  const fetchWishlist = async () => {
    setLoading(true);
    const endPoint = `https://api.rawg.io/api/games?key=1be3562e62a244c4a6bfd6dbea03b151&search=${submittedTerm}`;
    const response = await axios.get(endPoint);
    setSearchResults(response.data.results);
    setLoading(false);
  };
  const addToWishlist = async (data) => {
    const { name: title, background_image: image } = data;
    const structuredData = { title, image };
    axios
      .post("https://amanuelf.pythonanywhere.com/api/add_wishlist/", structuredData)
      .then((response) => {
        setaddGameResponse(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (hasPageBeenRendered.current) {
      fetchWishlist();
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
            <span>Add some games to Your Watch list</span>
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
              <div>
                <LoadingCard />
              </div>
            ) : (
              searchResults.map((game) => (
                <div key={game.id} className="result-card">
                  <img
                    className="result-img"
                    src={game.background_image}
                    alt="game image"
                  />
                  <div className="result-content">
                    <div className="result-text">
                      <div>
                        <span style={{ paddingRight: "10px" }}>
                          {game.name}{" "}
                        </span>
                        <span> ({game.released})</span>
                      </div>
                      <button
                        onClick={() => {
                          addToWishlist(game);
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
export default AddWishListOverlay;
