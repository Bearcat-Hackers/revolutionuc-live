# revolutionuc-live

## Getting Started

* Copy `.env.example` to `.env` and set the `NOTIFICATIONS_KEY` to something random
* `npm install` and `npm install -g webpack`
* Front-end javascript is built with [webpack](https://github.com/webpack/webpack). `cd lib/client` and `webpack --watch` to build and watch.
* `npm start` to start the [express](https://github.com/expressjs/express/) web server
* Go to [localhost:3000](http://localhost:3000/)

## api

Example post request to publish push notification. Pass the `NOTIFICATIONS_KEY` that is setup in `.env` and a payload message: `curl -d "apikey=ffreffwwrew&payload=My Message" http://localhost:3000/api/v1/notification/publish` (add a `-v` flag for a verbose response message)

## Notes

- RevolutionUC fall 2016 colors: #DB0010 and #8E000A

## TODO

- Add support for custom notification icon
- Add newbie hacker guides (ex: [pennapps hacker guide](http://mentoring.pennapps.com/guide/))
