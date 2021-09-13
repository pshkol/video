import MediaPlayer from "./MediaPlayer.js";

window.onload = () => {
    let videoModule = document.querySelector(".video-module");
    let video = document.querySelector(".video-module__video");
    let playButton = document.querySelector(".pp__play");
    let pauseButton = document.querySelector(".pp__pause");
    let duration = document.querySelector(".controls__duration");
    let currentTime = document.querySelector(".controls__currentTime");
    let pointerTimeLine = document.querySelector(".timeline__pointer");
    let timeLine = document.querySelector(".timeline");
    let targetTimeLine = document.querySelector(".timeline__target");
    let volumeLine = document.querySelector(".volume__hover");
    let targetVolumeLine = document.querySelector(".volume__target");
    let pointerVolumeLine = document.querySelector(".volume__pointer");
    let fullScreenHTML = document.querySelector(".controls__fullscreen");
    
    let playInterval;
    let mouseDownTimeLine;
    let mouseDownVolume;
    
    let mediaPlayer = new MediaPlayer(video);
    mediaPlayer.init();
    
    duration.innerHTML = `${mediaPlayer.duration.minutes}:${mediaPlayer.duration.seconds}`;
    pointerVolumeLine.style.left = `${mediaPlayer.volume*100}%`;
    
    
    // Functions declaration
    
    function togglePlayPause() {
        if (mediaPlayer.getVideo.paused) {
            playButton.style.display = "none";
            pauseButton.style.display = "block";
            playInterval = setInterval(() => {
                currentTime.innerHTML = `${mediaPlayer.currentTime().minutes}:${("0" + mediaPlayer.currentTime().seconds).slice(-2)}`;
                if (!mouseDownTimeLine) {
                    pointerTimeLine.style.left = mediaPlayer.currentTime().milliseconds/mediaPlayer.duration.milliseconds*100 + "%";
                }
            }, 100);
        } else {
            pauseButton.style.display = "none";
            playButton.style.display = "block";
            clearInterval(playInterval);
        }
        mediaPlayer.playPause();
    }
    
    
    // Listeners
    
    playButton.addEventListener("click", () => {
        togglePlayPause();
    })
    
    pauseButton.addEventListener("click", () => {
        togglePlayPause();
    })
    
    mediaPlayer.getVideo.addEventListener("click", () => {
        togglePlayPause();
    })
    
    
    timeLine.addEventListener("click", (e) => {
        pointerTimeLine.style.left = e.offsetX - (pointerTimeLine.offsetWidth / 2) + "px";
        mediaPlayer.getVideo.currentTime = e.offsetX / timeLine.offsetWidth * mediaPlayer.duration.milliseconds;
        currentTime.innerHTML = `${mediaPlayer.currentTime().minutes}:${("0" + mediaPlayer.currentTime().seconds).slice(-2)}`;
    })
    
    timeLine.addEventListener("mousemove", (e) => {
        let targetSeconds = Math.floor(e.offsetX / timeLine.offsetWidth * mediaPlayer.duration.milliseconds) - Math.floor(e.offsetX / timeLine.offsetWidth * video.duration / 60) * 60;
        let targetMinutes = Math.floor(e.offsetX / timeLine.offsetWidth * mediaPlayer.duration.milliseconds / 60)
    
        targetTimeLine.style.display = "block";
        targetTimeLine.style.left = e.offsetX - (targetTimeLine.offsetWidth / 2) + "px";
        targetTimeLine.innerHTML = `${targetMinutes}:${("0" + targetSeconds).slice(-2)}`;

        if (mouseDownTimeLine) {
            pointerTimeLine.style.left = e.offsetX - (pointerTimeLine.offsetWidth / 2) + "px";
        }
    })
    
    timeLine.addEventListener("mouseout", () => {
        targetTimeLine.style.display = "none";
        mouseDownTimeLine = false;
    })

    timeLine.addEventListener("mousedown", (e) => {
        mouseDownTimeLine = true;
        pointerTimeLine.style.left = e.offsetX - (pointerTimeLine.offsetWidth / 2) + "px";
    })

    timeLine.addEventListener("mouseup", () => {
        mouseDownTimeLine = false;
    })

    volumeLine.addEventListener("mousedown", (e) => {
        mouseDownVolume = true;
        pointerVolumeLine.style.left = e.offsetX - (pointerVolumeLine.offsetWidth / 2) + "px";
    })

    volumeLine.addEventListener("mouseup", () => {
        mouseDownVolume = false;
    })
    
    volumeLine.addEventListener("click", (e) => {
        pointerVolumeLine.style.left = e.offsetX - (pointerVolumeLine.offsetWidth / 2) + "px";
        mediaPlayer.volume = e.offsetX / volumeLine.offsetWidth;
    })
    
    volumeLine.addEventListener("mousemove", (e) => {
        targetVolumeLine.innerHTML = `${(e.offsetX / volumeLine.offsetWidth * 100).toFixed(0)}%`
        targetVolumeLine.style.display = "block";
        targetVolumeLine.style.left = e.offsetX - (targetVolumeLine.offsetWidth /2 ) + "px";

        if (mouseDownVolume) {
            pointerVolumeLine.style.left = e.offsetX - (pointerVolumeLine.offsetWidth / 2) + "px";
        }
    })
    
    volumeLine.addEventListener("mouseout", () => {
        targetVolumeLine.style.display = "none";
        mouseDownVolume = false;
    })
    
    fullScreenHTML.addEventListener("click", () => {
        if (document.fullscreenElement === null) {
            videoModule.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    })
    
    videoModule.addEventListener("fullscreenchange", () => {
        pointerVolumeLine.style.left = video.volume * volumeLine.offsetWidth - pointerVolumeLine.offsetWidth / 2 + "px";
        pointerTimeLine.style.left = mediaPlayer.currentTime().milliseconds / mediaPlayer.duration.milliseconds * timeLine.offsetWidth - pointerTimeLine.offsetWidth / 2 + "px";
    })
}
