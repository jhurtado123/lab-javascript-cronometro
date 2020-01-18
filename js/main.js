class Cron {
    constructor(time, containerId) {
        this.container = containerId;
        this.time = this._convertSecondsToTime(time);
        this.backupTime = this.time;
        this.interval = undefined;
        this._buildCronContainer();
    }

    start() {
        if (this.interval !== undefined) return false;

        this.interval = setInterval(() => {
            this.time--;
            this.showTime();
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = undefined;
    }

    reset() {
        this.time = this.backupTime;
        this.showTime();
    }

    showTime() {
        const minutes = ~~(this.time / 60);
        const seconds = this.time % 60;
        document.querySelector(`#${this.container}`).innerHTML = this.time > 0 ? `${Math.floor(minutes)}min ${seconds}s` : 'RING!';
        if (this.time === 0) this.stop();
    }

    _convertSecondsToTime(time) {
        let timeInSeconds = 0;

        time.split(' ').forEach(timePart => {
            timeInSeconds += timePart.match(/min/g) ? timePart.match(/\d+/g)[0] * 60 : parseInt(timePart.match(/\d+/g)[0]);
        });
        return timeInSeconds;
    }

    _buildCronContainer() {
        const htmlString = `<div><h1 id="${this.container}">00m 00s</h1>
                                <button onclick="getCronById('${this.container}').start()">Start</button>
                                <button onclick="getCronById('${this.container}').stop()">Stop</button>
                                <button onclick="getCronById('${this.container}').reset()">Reset</button>
                                </div>`;
        document.querySelector('body').insertAdjacentHTML('beforeend', htmlString);
    }
}

function getCronById(id) {
    return crons.filter(cron => cron.container === id)[0];
}
