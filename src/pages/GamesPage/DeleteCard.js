import { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios'

const DeleteCard = ({ game, fetchData, state, setDeleteOverlay }) => {
    const [status, setStatus] = useState("");
    const deleteGame = async () => {
      try {
        const response = await axios.delete(
          `https://journeysofaman.vercel.app/api/remove/${game.id}/`
        );
        setStatus(response.data);
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <>
        {state ? (
          <div className="delete-overlay">
            <div className="delete-container">
              <i onClick={() => setDeleteOverlay()} className="fas fa-xmark"></i>
              <div className="caution-box">
                <span>
                  Are you sure to remove{" "}
                  <span className="delete-title">{game.title}</span>{" "}
                </span>
                <div>
                  <button
                    onClick={() => setDeleteOverlay()}
                    className="search-btn-ol"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      deleteGame();
                      setDeleteOverlay();
                    }}
                    className="search-btn-ol"
                    style={{ marginLeft: "10px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };
export default DeleteCard;