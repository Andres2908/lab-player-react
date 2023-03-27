import { useState } from "react";

function BookmarkButton({ player, setBookmarks }) {
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
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Nota"
        value={bookmarkName}
        onChange={e => setBookmarkName(e.target.value)}
      />
      <button type="button" class="btn btn-dark" onClick={handleAddBookmark}>Add Bookmark</button>
    </div>
  );
}

export default BookmarkButton