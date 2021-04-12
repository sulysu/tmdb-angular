const express = require('express');
const axios = require('axios');
var cors = require('cors')
const router = express.Router();
var config = require('./config');

const MOVIE_PREFIX = 'https://api.themoviedb.org/3';

//4.1.2 trending movie
router.get('/trending', (req, res) => {
  section = '/trending/movie/day';
  let url = MOVIE_PREFIX + section;
  axios.get(url, {
    params: {
      api_key: config.API_KEY,
    }
  })
    .then((response) => {
      let results = response.data.results;
      let res_arr = [];

      results.forEach(record => {
        if (record.poster_path == null) {
          return true;
        }
        let poster_path = config.POSTER_PREFIX + record.poster_path;

        let dict = {
          "id": record.id,
          "media_type": "movie",
          "title": record.title,
          "poster_path": poster_path,
        };
        res_arr.push(dict);
      });
      res.json(res_arr);
    })
    .catch((error) => {
      console.log(error);
    });
});

//4.1.3 top-rated movie
router.get('/top_rated', (req, res) => {
  section = '/movie/top_rated';
  axiosRequest(section, res);
});

//4.1.4 currently playing movie
router.get('/now_playing', (req, res) => {
  section = '/movie/now_playing';
  let url = MOVIE_PREFIX + section;
  axios.get(url, {
    params: {
      api_key: config.API_KEY,
      language: config.LAN,
      page: config.PAGE,
    }
  })
    .then((response) => {
      let results = response.data.results;
      let res_arr = [];

      results.forEach(record => {
        if (record.backdrop_path == null) {
          return;
        }
        let backdrop_path = config.BACKDROP_PREFIX + record.backdrop_path;
        let poster_path = config.POSTER_PREFIX + record.poster_path;
        let dict = {
          "media_type": "movie",
          "id": record.id,
          "title": record.title,
          "backdrop_path": backdrop_path,
          "poster_path": poster_path,
        };
        res_arr.push(dict);
      });
      res.json(res_arr);
    })
    .catch((error) => {
      console.log(error);
    });
})

//4.1.5 popular movie 
router.get('/popular', (req, res) => {
  section = '/movie/popular';
  axiosRequest(section, res);
})

//4.1.6 recommended movie
router.get('/recommendation', cors(), (req, res) => {
  let id = req.query.id;
  section = `/movie/${id}/recommendations`;
  axiosRequest(section, res);
})

//4.1.7 similar movie
router.get('/similar', (req, res) => {
  let id = req.query.id;
  section = `/movie/${id}/similar`;
  axiosRequest(section, res);
})

//4.1.8 video 
router.get('/videos', (req, res) => {
  let id = req.query.id;
  section = `/movie/${id}/videos`;
  let url = MOVIE_PREFIX + section;

  axios.get(url, {
    params: {
      api_key: config.API_KEY,
      language: config.LAN,
      page: config.PAGE,
    }
  })
    .then((response) => {
      let results = response.data.results;
      let res_arr = [];

      results.forEach(record => {
        let video_url = 'https://www.youtube.com/watch?v=' + record.key;

        let dict = {
          "site": record.site,
          "type": record.type,
          "name": record.name,
          "key": record.key,
          "video_url": video_url,
        };
        res_arr.push(dict);
      });
      res.json(res_arr);
    })
    .catch((error) => {
      console.log(error);
    });
})


//4.1.9 detail of movie
router.get('/details', (req, res) => {
  let id = req.query.id;
  section = `/movie/${id}`;
  let url = MOVIE_PREFIX + section;

  axios.get(url, {
    params: {
      api_key: config.API_KEY,
      language: config.LAN,
      page: config.PAGE,
    }
  })
    .then((response) => {
      let record = response.data;

      let details = {
        "poster_path": config.POSTER_PREFIX + record.poster_path,
        "title": record.title,
        "genres": record.genres,
        "spoken_languages": record.spoken_languages,
        "release_date": record.release_date,
        "runtime": record.runtime,
        "overview": record.overview,
        "vote_average": record.vote_average,
        "tagline": record.tagline
      }

      res.json(details);
    })
    .catch((error) => {
      console.log(error);
    });
})


//4.1.10 review of movie
router.get('/reviews', (req, res) => {
  let id = req.query.id;
  section = `/movie/${id}/reviews`;
  let url = MOVIE_PREFIX + section;

  axios.get(url, {
    params: {
      api_key: config.API_KEY,
      language: config.LAN,
      page: config.PAGE,
    }
  })
    .then((response) => {
      let results = response.data.results;
      let res_arr = [];

      results.forEach(record => {
        let rating = (record.author_details.rating == null) ? 0 : record.author_details.rating;
        let default_path = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"
        let path_prefix = "https://image.tmdb.org/t/p/original";
        let avatar_path;


        if (record.author_details.avatar_path == null || record.author_details.avatar_path.includes("http")) {
          avatar_path = default_path;
        } else {
          avatar_path = path_prefix + record.author_details.avatar_path;
        }

        let dict = {
          "author": record.author,
          "content": record.content,
          "created_at": record.created_at,
          "url": record.url,
          "rating": rating,
          "avatar_path": avatar_path,
        };
        res_arr.push(dict);
      });
      res.json(res_arr);
    })
    .catch((error) => {
      console.log(error);
    });

})


//4.1.11 cast of movie 
router.get('/cast', (req, res) => {
  let id = req.query.id;
  section = `/movie/${id}/credits`;
  let url = MOVIE_PREFIX + section;

  axios.get(url, {
    params: {
      api_key: config.API_KEY,
      language: config.LAN,
      page: config.PAGE,
    }
  })
    .then((response) => {
      let results = response.data.cast;
      let res_arr = [];

      results.forEach(record => {
        if (record.profile_path == null) {
          return true;
        }
        let dict = {
          "id": record.id,
          "name": record.name,
          "character": record.character,
          "profile_path": config.PROFILE_PREFIX + record.profile_path,
        };
        res_arr.push(dict);
      });
      res.json(res_arr);
    })
    .catch((error) => {
      console.log(error);
    });

})


module.exports = router;

function axiosRequest(section, res) {
  let url = MOVIE_PREFIX + section;
  axios.get(url, {
    params: {
      api_key: config.API_KEY,
      language: config.LAN,
      page: config.PAGE,
    }
  })
    .then((response) => {
      let results = response.data.results;
      let res_arr = [];

      results.forEach(record => {
        if (record.poster_path == null) {
          return true;
        }
        let poster_path = config.POSTER_PREFIX + record.poster_path;

        let dict = {
          "id": record.id,
          "media_type": "movie",
          "title": record.title,
          "poster_path": poster_path,
        };
        res_arr.push(dict);
      });
      res.json(res_arr);
    })
    .catch((error) => {
      console.log(error);
    });
}

