import player from 'play-sound';

class Alarm {
    constructor() {
        this.play = player({});
        this.audio = undefined;
    }

    playTheMusic() {
        // access the node child_process in case you need to kill it on demand
        this.audio = this.play.play('./assets/survivor.mp3', function (err) {
            if (err && !err.killed) throw err
        })
        return true;
    }

    stopTheMusic() {
        if (this.audio) {
            this.audio.kill();
            return true;
        }
        return false;
    }
}

export default Alarm;