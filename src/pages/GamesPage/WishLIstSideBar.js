import { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios'
const WishListSideBar = ({ showWishList, setShowWishList }) => {
  const [wishlist, setwishlist] = useState([]);
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/show_wishlist/`
      );
      setwishlist(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const removeFromWishList = async (item) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/remove_wishlist/${item.id}/`
      );
      fetchWishlist();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);
  return (
    <div className={showWishList}>
      <div className="inner-sidebar">
        <i
          style={{ fontSize: "35px", cursor: "pointer" }}
          onClick={() => setShowWishList("wishlist-container-hide")}
          className="fas fa-xmark"
        ></i>
        <div className="wishlist-cards">
          <span style={{ textAlign: "center" }}>Wish List</span>
          {wishlist.length > 0
            ? wishlist.map((item) => (
                <div key={item.id} className="wishlist-card">
                  <img className="wishlist-img" src={item.image} />
                  <span>
                    {item.title} <br />
                    <span>wished {item.date_wished}</span>
                  </span>

                  <span
                    onClick={() => removeFromWishList(item)}
                    title="remove"
                    style={{ marginLeft: "auto" }}
                  >
                    <i className="fas fa-minus"></i>
                  </span>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};
export default WishListSideBar;
