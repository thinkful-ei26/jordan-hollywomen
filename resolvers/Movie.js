const axios = require('axios');

module.exports = {
    movieCast: async (movie) => {
        console.log(movie.title)
        return await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=13842c72b65b743bc68b644cf060c727`)
        .then(res => res.data.cast);
    }
}