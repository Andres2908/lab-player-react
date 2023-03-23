import { useEffect, useRef, useState } from "react";
// import fluidPlayer from "fluid-player";
// import "./App.css";
import ReactPlayer from "react-player";
import { ForwardIcon, BackwardIcon } from "@heroicons/react/20/solid";
import "./MyVideoPlayer.css";

function App() {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 3];
  const playerConfig = {
    controls: true,
    config: {
      file: {
        attributes: {
          controlsList: "nodownload", // deshabilita la opción de descarga
          playbackRate: speeds.join(","),
        },
      },
    },
    width: "100%",
    height: "100%",
  };

  const playerRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const handleForward10 = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleBackward10 = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  return (
    <div
      className="video-container"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url="http://vjs.zencdn.net/v/oceans.mp4"
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
  );
}

export default App;
