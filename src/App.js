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

  const handleBookmarkClick = (bookmark) => {
    playerRef.current.seekTo(bookmark.time);
  };

  const handleForward10 = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleBackward10 = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
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
      </div>

      {bookmarks &&
        bookmarks.map((bookmark, index) => {
          if (bookmark.time === playerRef.current.getCurrentTime()) {
            return (
              <div key={index} className="text-marker-container">
                <p className="text-marker">{bookmark.name}</p>
              </div>
            );
          }
        })}

      <BookmarkButton player={playerRef} setBookmarks={setBookmarks} />

      {bookmarks.map((bookmark, index) => (
        <button
          key={index}
          onClick={() => {
            if (bookmark.time === playerRef.current.getCurrentTime()) {
              return (
                <div className="text-marker-container">
                  <p className="text-marker">{bookmark.name}</p>
                </div>
              );
            }

            handleBookmarkClick(bookmark);
          }}
        >
          {bookmark.name}
        </button>
      ))}
    </>
  );
}

export default App;
