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

const cast = [
  {
    "cast_id": 4,
    "character": "The Narrator",
    "credit_id": "52fe4250c3a36847f80149f3",
    "gender": 2,
    "id": 819,
    "name": "Edward Norton",
    "order": 0,
    "profile_path": "/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg"
},
{
    "cast_id": 5,
    "character": "Tyler Durden",
    "credit_id": "52fe4250c3a36847f80149f7",
    "gender": 2,
    "id": 287,
    "name": "Brad Pitt",
    "order": 1,
    "profile_path": "/kU3B75TyRiCgE270EyZnHjfivoq.jpg"
}
]

app.get('/movie/cast', (req, res) => {
  res.status(200).json(cast);
});

//get length of cast divided by females to get gender score
app.get('/search/:movieTitle', (req, res) => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=13842c72b65b743bc68b644cf060c727&query=${req.params.movieTitle}`)
  .then(res => res.json())
  .then(data => {
    res.status(200).json(data);
  })
});

app.get('/search/:tvTitle', (req, res) => {
  fetch(`https://api.themoviedb.org/3/search/tv?api_key=13842c72b65b743bc68b644cf060c727&query=${req.params.tvTitle}&append_to_response=images`)
  .then(data => {
    res.json(data);
  })
  res.status(200).json();
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
