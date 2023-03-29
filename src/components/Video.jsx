import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { ForwardIcon, BackwardIcon, BookmarkIcon } from "@heroicons/react/20/solid";
import "./MyVideoPlayer.css";

import BookmarkButton from "./BookmarkButton";

export default function Video({ width }) {

    const handleHeight = (width) => {
        if (width >= 426 && width < 640) return "240px"
        else if (width >= 640 && width < 854) return "360px"
        else if (width >= 854 && width < 1280) return "480px"
        else return "400px"
    }

    const handleBottomText = (width) => {
        if (width >= 426 && width < 640) return `${(parseInt(playerRef.current?.props.height) / 4) + 40}px`
        if (width >= 640 && width < 854) return `${(parseInt(playerRef.current?.props.height) / 4) + 25}px`
        if (width >= 854 && width < 1280) return `${(parseInt(playerRef.current?.props.height) / 4) + 5}px`
    }

    const handleLeftMark = (bookmark) => {
        return `${((bookmark.time / playerRef.current.getDuration()) * 100) + 2}px`
        // if ((playerRef.current.getDuration() / 2) < playerRef.current.getCurrentTime()) return `${((bookmark.time / playerRef.current.getDuration()) * 100) + 2}px`
        // else if ((playerRef.current.getDuration() / 2) < playerRef.current.getCurrentTime()) return `${((bookmark.time / playerRef.current.getDuration()) * 98) - 2}px`
    }

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
        width: width + "px",
        height: handleHeight(width),
    };

    const playerRef = useRef(null);
    const [hovering, setHovering] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [bookmarkComponent, setBookmarkComponent] = useState(null);
    const [showMarkers, setShowMarkers] = useState(false)

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

    const handleShowMarkers = () => {
        showMarkers ? setShowMarkers(false) : setShowMarkers(true)
    }

    const handleMarkers = (bookmark = {}) => {
        if (Object.keys(bookmark).length > 0) {
            return (
                <div className="text-marker-container" style={{ bottom: `${handleBottomText(width)}` }}>
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
                    left: `${((bookmark.time / playerRef.current.getDuration()) * 100) + 1}%`
                }}
            ></li>
        ));
    };

    return (
        <>
            <div
                className="video-container"
                style={{
                    width: `${playerRef.current?.props.width}`,
                }}
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

                {showMarkers && (
                    <div className="timeline">
                        <ul className="timeline-markers">{renderMarkers()}</ul>
                    </div>
                )
                }

                {hovering && (
                    <div className="button-marker-container" style={{ bottom: `${showMarkers ? "48px" : "32px"}` }}>
                        <button className="button-marker" onClick={handleShowMarkers}><BookmarkIcon className="color-icon-marker" /></button>
                    </div>
                )}

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

            {showMarkers && bookmarkComponent}

            {showMarkers && (
                <BookmarkButton player={playerRef} setBookmarks={setBookmarks} width={playerRef.current?.props.width} />
            )
            }
        </>
    )
}
