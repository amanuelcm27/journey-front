const OpinionForm = ({
    show,
    addOpinion,
    setEditingOpinion,
    setOpinion,
    setWritingOpinion,
    opinion,
    isWritingOpinion,
    isEditingOpinion,
  }) => {
    return (
      <>
        {show === "editing" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addOpinion();
              setEditingOpinion(false);
            }}
          >
            <textarea
              className="opinion-form"
              type="text"
              value={opinion}
              autoFocus={isEditingOpinion}
              onChange={(e) => setOpinion(e.target.value)}
              required
            ></textarea>
            <button
              style={{ margin: "15px" }}
              onClick={() => setEditingOpinion(false)}
              className="search-btn-ol"
            >
              Cancel
            </button>
            <button type="submit" className="search-btn-ol">
              Add
            </button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addOpinion();
            }}
          >
            <textarea
              className="opinion-form"
              type="text"
              value={opinion}
              autoFocus={isWritingOpinion}
              onChange={(e) => setOpinion(e.target.value)}
            ></textarea>
            <button
              style={{ margin: "15px" }}
              onClick={() => setWritingOpinion(false)}
              className="search-btn-ol"
            >
              Cancel
            </button>
            <button type="submit" className="search-btn-ol">
              Add
            </button>
          </form>
        )}
      </>
    );
  };
  export default OpinionForm;