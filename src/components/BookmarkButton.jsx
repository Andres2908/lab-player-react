import { useState } from "react";

function BookmarkButton({ player, setBookmarks, width }) {
  const [bookmarkName, setBookmarkName] = useState('');

  const handleAddBookmark = () => {
    const bookmark = {
      name: bookmarkName,
      time: player.current.getCurrentTime(),
    };
    setBookmarks(bookmarks => [...bookmarks, bookmark]);
    setBookmarkName('');
  };

  return (
    <div className="input-group mb-3" style={{ width: `${width}` }}>
      <input
        type="text"
        className="form-control"
        placeholder="Nota"
        value={bookmarkName}
        onChange={e => setBookmarkName(e.target.value)}
      />
      <button type="button" className="btn btn-dark" onClick={handleAddBookmark}>Add Bookmark</button>
    </div >
  );
}

export default BookmarkButton