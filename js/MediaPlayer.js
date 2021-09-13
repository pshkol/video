class MediaPlayer {
    constructor(video) {
        this.video = video,
        this._duration,
        this.currentTime = () => {
            return {
                minutes: Math.floor(video.currentTime / 60),
                seconds: Math.floor(video.currentTime - Math.floor(video.currentTime / 60) * 60),
                milliseconds: video.currentTime
            }
        }
    }

    init() {
        this._duration = {
            minutes: Math.floor(this.video.duration / 60),
            seconds: Math.floor(this.video.duration - Math.floor(this.video.duration / 60) * 60),
            milliseconds: this.video.duration
        }
    }

    playPause() {
        this.video.paused ? this.video.play() : this.video.pause();
    }

    get getVideo() {
        return this.video;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        this.video.duration = value;
    }

    get volume() {
        return this.video.volume;
    }

    set volume(value) {
        this.video.volume = value;
    }
}

export default MediaPlayer