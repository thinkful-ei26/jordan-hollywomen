const axios = require('axios');

module.exports = {
    tvCast: async (tv) => {
        // console.log(tv.id)
        return await axios.get(`https://api.themoviedb.org/3/tv/${tv.id}/credits?api_key=13842c72b65b743bc68b644cf060c727`)
        .then(res => res.data.cast);
    }
}