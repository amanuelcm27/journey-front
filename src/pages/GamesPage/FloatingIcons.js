import axios from 'axios'

const FloatingIcons = ({ showOverlay, setShowWishList }) => {
    return (
      <div className="floating-icons">
        <div onClick={() => showOverlay("add")} className="floating-plus">
          <i title="add Games" className="fas fa-plus"></i>
        </div>
        <div
          onClick={() => showOverlay("wishlist")}
          className="floating-wishlist"
        >
          <i title="add Wish List" className="fas fa-list"></i>
        </div>
        <div
          onClick={() => setShowWishList("wishlist-container")}
          className="floating-heart"
        >
          <i title="Wish List" className="fa-regular fa-heart"></i>
        </div>
      </div>
    );
  };
  export default FloatingIcons;