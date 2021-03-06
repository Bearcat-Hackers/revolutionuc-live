'use strict';

class DynamicCSS {
    /**
     * Switches basic css classes depending on the time of day.
     * A completely necessary feature for all hackers.
     *
     * @param {number} start - hour to start night css
     * @param {number} end - hour to end night css
     */
    constructor(start = 22, end = 8) {
        this.start = start;
        this.end = end;
    };

    /**
     * Watches the time and calls updateStatus
     *
     * @param {number} interval - interval in milliseconds
     * @return {undefined}
     */
    watch(interval = 3600) {
        this.updateStatus();
        setInterval(this.updateStatus.bind(this), interval);
    };

    /**
     * Toggles day and night css classes based on time of day
     *
     * @return {undefined}
     */
    updateStatus() {
        const hour = (new Date()).getHours();
        const bodyClassList = document.body.classList;
        const night = (this.start <= hour && hour <= 24) || (0 <= hour && hour <= this.end);

        if (night && bodyClassList.contains('day')) {
            // apply night class
            bodyClassList.remove('day');
            bodyClassList.add('night');
        }
        else if(!night && bodyClassList.contains('night')) {
            // apply day class
            bodyClassList.remove('night');
            bodyClassList.add('day');
        }
        else if(night) {
            // apply night class
            bodyClassList.add('night');
        }
        else {
            // apply day class
            bodyClassList.add('day');
        }
    };
};

module.exports = DynamicCSS;
