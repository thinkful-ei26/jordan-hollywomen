'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
const fetch = require('isomorphic-fetch');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//search by movie title
app.get('/search/:movieTitle', (req, res) => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=13842c72b65b743bc68b644cf060c727&query=${req.params.movieTitle}&append_to_response=images`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    res.status(200).json(data);
  })
});

//search by tv title
app.get('/search/tv/:tvTitle', (req, res) => {
  fetch(`https://api.themoviedb.org/3/search/tv?api_key=13842c72b65b743bc68b644cf060c727&query=${req.params.tvTitle}`)
  .then(res => res.json())
  .then(data => {
    res.status(200).json(data);
  })
});

//get cast with search by movie id 
app.get('/movie/:id', (req, res) => {
  fetch(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=13842c72b65b743bc68b644cf060c727`)
  .then(res => res.json())
  .then(_data => {
    res.status(200).json(_data);
  })
});

//get cast with search by tv id
app.get('/tv/:id', (req, res) => {
  fetch(`https://api.themoviedb.org/3/tv/${req.params.id}/credits?api_key=13842c72b65b743bc68b644cf060c727`)
  .then(res => res.json())
  .then(_data => {
    res.status(200).json(_data);
  })
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
