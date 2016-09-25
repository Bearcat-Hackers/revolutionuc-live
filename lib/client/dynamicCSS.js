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
    constructor(start, end) {
        this.start = start;
        this.end = end;
    };

    /**
     * Watches the time for changes and applies necessary css classes
     *
     * @return {undefined}
     */
    watch() {
        const time = new Date();

        // check if the dom needs to be manipulated to add the night css class
    };
};

module.exports = DynamicCSS;
