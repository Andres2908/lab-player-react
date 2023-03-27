import { useRef, useState } from "react";
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
    width: "1050px",
    height: "800px",
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
          setBookmarkComponent(component);
        }
        return null;
      });
    }
  };

  const handleMarkers = (bookmark = {}) => {
    if (Object.keys(bookmark).length > 0) {
      return (
        <div className="text-marker-container">
          <p className="text-marker">{bookmark.name}</p>
        </div>
      );
    } else return null;
  };

  const renderMarkers = () => {
    return bookmarks.map((bookmark) => (
      <li
        key={bookmark.id}
        className="timeline-marker"
        style={{
          left: `${(bookmark.time / playerRef.current.getDuration()) * 100}%`,
        }}
      ></li>
    ));
  };

  return (
    <>
      {console.log(playerRef.current?.props.width)}
      {console.log(playerRef.current?.props.height)}
      <div
        style={{
          height: `${playerRef.current?.props.height}`,
          width: `${playerRef.current?.props.width}`,
        }}
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

        <div className="timeline">
          <ul className="timeline-markers">{renderMarkers()}</ul>
        </div>

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
      {bookmarks.map((bookmark, index) => (
        <button
          type="button"
          class="btn btn-secondary"
          key={index}
          onClick={() => {
            if (bookmark.time === playerRef.current.getCurrentTime()) {
              return (
                <div>
                  <p>{bookmark.name}</p>
                </div>
              );
            }

            handleBookmarkClick(bookmark);
          }}
        >
          {bookmark.name}
        </button>
      ))}

      <BookmarkButton player={playerRef} setBookmarks={setBookmarks} />
    </>
  );
}

export default App;
