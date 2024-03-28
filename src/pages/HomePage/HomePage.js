import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";
const SlideShow = ({ fetchedData }) => {
  return (
    <div className="game_images">
      <div className="game_slide">
        {fetchedData.map((game) => (
          <Link
            to={`detail/${game.id}`}
            key={game.id}
            className="game-img-container"
          >
            <img className="game-img" src={game.image} alt={game.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};
const HomePage = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [gameCount, setGameCount] = useState(0);
  const fetchData = useCallback(async () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((element) => observer.observe(element));
    try {
      const response = await axios.get("http://localhost:8000/api/all_games/");
      setFetchedData(response.data.games);
      setGameCount(response.data.count);
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <div className="header">
        <div className="header-first">
          <span className="hidden title">JOURNEY</span>
          <span className=" hidden sub-title">
            Welcome to my grand game collections
          </span>
        </div>
      </div>
      <div className="hidden title-explore" style={{ textAlign: "center" }}>
        Explore
      </div>
      <div
        className="hidden title-explore"
        style={{ textAlign: "center", fontSize: "3rem" }}
      >
        {gameCount} Played
      </div>
      <SlideShow fetchedData={fetchedData} />
      <div className="visit-more">
        <Link
          className="visit-more-link"
          style={{ textDecoration: "none", color: "red" }}
          to="/all_games/"
        >
          Visit More
        </Link>
      </div>

      <div className="title-explore" style={{ textAlign: "center" }}>
        Recently Played
      </div>
      <div className="last-section">
        {fetchedData.slice(0,8).map((game) => 
          <div className="recent-game-card">
            <img className="recent-card-img" src={game.image} />
          </div>
        )}
      </div>
    </>
  );
};
export default HomePage;
