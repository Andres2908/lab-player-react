import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { ForwardIcon, BackwardIcon } from "@heroicons/react/20/solid";
import "./MyVideoPlayer.css";

import BookmarkButton from "./components/BookmarkButton";

function App() {
  const playerConfig = {
    // playbackRate: 4.0, // establece la lista de velocidades de reproducción
    controls: true,
    config: {
      file: {
        attributes: {
          controlsList: "play nodownload ", // deshabilita la opción de descarga
        },
      },
    },
    width: "100%",
    height: "100%",
  };

  const playerRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkComponent, setBookmarkComponent] = useState(null);

  const handleBookmarkClick = (bookmark) => {
    playerRef.current.seekTo(bookmark.time);
  };

  const handleForward10 = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleBackward10 = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleProgress = () => {
    const currentTime = playerRef.current.getCurrentTime();
    if (bookmarks.length > 0) {
      bookmarks.forEach((bookmark) => {
        if (Math.floor(bookmark.time) === Math.floor(currentTime)) {
          const component = handleMarkers(bookmark);
          console.log(component);
          setBookmarkComponent(component);
        }
        return null;
      });
    }
  };

  const handleMarkers = (bookmark = {}) => {
    if (Object.keys(bookmark).length > 0) {
      // console.log(bookmark.name);
      return (
        <div className="text-marker-container">
          <p className="text-marker">{bookmark.name}</p>
        </div>
      );
    } else return null;
  };

  return (
    <>
      <div
        className="video-container"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <ReactPlayer
          ref={playerRef}
          url="http://vjs.zencdn.net/v/oceans.mp4"
          progressInterval={100}
          onProgress={handleProgress}
          {...playerConfig}
        />
        {hovering && (
          <div className="skip-buttons-container">
            <button className="skip-button" onClick={handleBackward10}>
              <BackwardIcon className="colorIcon" />
            </button>
            <button className="skip-button" onClick={handleForward10}>
              <ForwardIcon className="colorIcon" />
            </button>
          </div>
        )}
        {bookmarkComponent}
      </div>

      <BookmarkButton player={playerRef} setBookmarks={setBookmarks} />
    </>
  );
}

export default App;
