'use strict';

// Static pages

/**
 * Index page. Redirects to schedule
 */
exports.index = function(req, res) {
    // no 'homepage', redirect to schedule
    res.redirect('/schedule');
};

/**
 * Schedule page
 */
exports.schedule = function(req, res) {
    res.render('pages/schedule', { title: 'Schedule' });
};

/**
 * Sponsors page
 */
exports.sponsors = function(req, res) {
    res.render('pages/sponsors', { title: 'Sponsors' });
};

/**
 * Notifications page
 */
exports.notifications = function(req, res) {
    res.render('pages/notifications', { title: 'Notifications' });
};

/**
 * Tech talks page
 */
exports.techtalks = function(req, res) {
    res.render('pages/techtalks', { title: 'Tech Talks' });
};
