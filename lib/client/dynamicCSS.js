'use strict';

/**
 * Switches basic css styles depending on the time of day. A completely
 * necessary feature for all hackers.
 */
class DynamicCSS {
    /**
     * @param {number} start - hour to start night css
     * @param {number} end - hour to end night css
     */
    constructor(start = 23, end = 8) {
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

        // reset the day/night classes on body
        bodyClassList.remove('day');
        bodyClassList.remove('night');

        if ((this.start <= hour && hour <= 24) || (0 <= hour && hour <= this.end)) {
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
