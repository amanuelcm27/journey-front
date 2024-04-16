import { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios'

const FilterBar = ({ filterGameList }) => {
    const [titleState, settitleState] = useState("title");
    const [all_genres, setAllGenres] = useState([]);
    const fetchGenres = async () => {
      const response = await axios.get(`https://amanuelf.pythonanywhere.com/api/all_genres/`);
      setAllGenres(response.data.genres);
    };
    useEffect(() => {
      fetchGenres();
    }, []);
    console.log("GENERE",all_genres);
    return (
      <div id="filter" className="filters">
        <div onClick={() => filterGameList("all", null)} className="filter-item">
          <span className="">All</span>
        </div>
        <div
          onClick={() => {
            settitleState(titleState === "title" ? "-title" : "title");
            filterGameList(titleState, null);
          }}
          className="filter-item"
        >
          <span className="">Title</span>
        </div>
  
        <div className="filter-item">
          <div className="genre-options">
            <ul className="genre-list">
              {all_genres.map((genre) => (
                <li onClick={() => filterGameList("genre", genre)} key={genre}>
                  {genre}
                </li>
              ))}
            </ul>
          </div>
          <span className="genre">Genre</span>
        </div>
        <div
          onClick={() => filterGameList("favourite", null)}
          style={{}}
          className="filter-item"
        >
          <span className="">Favourite</span>
        </div>
      </div>
    );
  };
  export default FilterBar;