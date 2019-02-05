const axios = require('axios');

module.exports = async (root, args) => {
  return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=13842c72b65b743bc68b644cf060c727&query=${args.title}`)
  .then(res => res.data.results)
}

// https://api.themoviedb.org/3/search/movie?api_key=13842c72b65b743bc68b644cf060c727&query=${req.params.movieTitle}