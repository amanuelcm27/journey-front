import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./detail.css";
import React, { useRef, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import OpinionForm from "./OpinionForm";
import Skeleton from "react-loading-skeleton"
import { SkeletonTheme } from "react-loading-skeleton";
const GameDetail = () => {
  const { game_id } = useParams();
  const [detail, setDetail] = useState("");
  const [isWritingOpinion, setWritingOpinion] = useState(false);
  const [isEditingOpinion, setEditingOpinion] = useState(false);
  const [opinion, setOpinion] = useState("");

  const navigate = useNavigate();
  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/game_detail/${game_id}/`
      );
      setDetail(response.data);
      setOpinion(response.data.opinion);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDetails();
  }, []);
  const addOpinion = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/add_opinion/${game_id}/`,
        { opinion: opinion }
      );
      fetchDetails();
    } catch (e) {
      console.log(e);
    }
  };

  return (

    <div className="wrapper">
      <Navbar />
      <div className="main-container">
        <img className="detail-img" src={detail.image } />
        <div className="detail-container">
          <div className="detail-sub-container">
            <div className="game-title-card">
              <span className="detail-gt">{detail.title}</span>
              <span className="detail-gt-g">{detail.genre}</span>
              <span className="detail-gt-g">
                Completed : {detail.date_finished}
              </span>
            </div>
            <div className="game-description-container">
              <div className="gd-header">
                <span>Description</span>
              </div>
              <div className="gd-detail">
                <p>{detail.description}</p>
              </div>
            </div>
            <div className="game-description-container">
              <div className="gd-header">
                <span>My opinion</span>
                {detail.opinion ? (
                  <span
                    title="edit"
                    className="gd-opinion-add"
                    onClick={() => {
                      {
                        setEditingOpinion(true);
                        setOpinion(detail.opinion);
                      }
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </span>
                ) : (
                  <span title="write" className="gd-opinion-add">
                    <i
                      onClick={() => {
                        setWritingOpinion(true);
                      }}
                      className="fas fa-pen"
                    ></i>
                  </span>
                )}
              </div>
              <div className="gd-detail">
                {detail.opinion ? (
                  isEditingOpinion ? (
                    <OpinionForm
                      show="editing"
                      addOpinion={addOpinion}
                      setOpinion={setOpinion}
                      setEditingOpinion={setEditingOpinion}
                      isEditingOpinion={isEditingOpinion}
                      opinion={opinion}
                    />
                  ) : (
                    <p>{detail.opinion}</p>
                  )
                ) : isWritingOpinion ? (
                  <OpinionForm
                    show="writing"
                    addOpinion={addOpinion}
                    setOpinion={setOpinion}
                    setWritingOpinion={setWritingOpinion}
                    isWritingOpinion={isWritingOpinion}
                    opinion={opinion}
                  />
                ) : (
                  <p>No opinion yet</p>
                )}
              </div>
            </div>
            <button style={{ marginBottom: "10px" }} className="search-btn-ol">
              <Link onClick={() => navigate(-1)}>Go Back</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};
export default GameDetail;
