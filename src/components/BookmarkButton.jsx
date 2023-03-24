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
    <div>
      <input
        type="text"
        placeholder="Nota"
        value={bookmarkName}
        onChange={e => setBookmarkName(e.target.value)}
      />
      <button onClick={handleAddBookmark}>Add Bookmark</button>
    </div>
  );
}

export default BookmarkButton