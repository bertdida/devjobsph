# DevJobsPh

DevJobsPh is a job aggregator made especially for Filipino Software Developers. At this moment, only [ph.indeed.com](https://ph.indeed.com/), [glassdoor.com](https://www.glassdoor.com/), and [onlinejobs.ph](https://www.onlinejobs.ph/) job sites are maintained.

Check the live site on [devjobsph.herokuapp.com](https://devjobsph.herokuapp.com/).

<p align="center">
  <img src="https://github.com/bertdida/DevJobsPh/blob/main/img/screenshot.png" alt="DevJobsPh screenshot"/>
</p>

## Built With

- MongoDB
- Express.js
- React
- Node 12
- NPM for managing dependencies
- Cheerio and Puppeteer for scraping
- Heroku as a hosting provider

## Local Environment

Clone this repo and install the dependencies by running:

```bash
$ git clone https://github.com/bertdida/DevJobsPh.git
$ cd DevJobsPh
$ npm install
```

_This project uses MongoDB as a database. Follow [this guide](https://docs.mongodb.com/manual/administration/install-community/) on how to install and run its community edition._

Create a local database and rename [server/.env.example](https://github.com/bertdida/DevJobsPh/blob/main/server/.env.example) to remove .example and set its `DB_URI` to your database connection string.

Run the scraper and start the app.

```bash
$ npm run scrape
$ npm run dev
```

## Contributing

Any contributions are always welcome! If you have any problem, idea, or suggestion for the project, feel free to create issues or pull requests.

## Author

Herbert Verdida / [@bertdida](https://twitter.com/bertdida)
