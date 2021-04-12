const express = require('express');
const axios = require('axios');
var cors = require('cors')
const router = express.Router();
var config = require('./config');

const TV_PREFIX = 'https://api.themoviedb.org/3';

//4.1.12 trending tv
router.get('/trending', (req, res) => {
  section = '/trending/tv/day';
  let url = TV_PREFIX + section;
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
          "name": record.name,
          "media_type" : "tv",
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

//4.1.13 top-rated tv
router.get('/top_rated', (req, res) => {
  section = '/tv/top_rated';
  axiosRequest(section, res);
});


//4.1.14 popular tv
router.get('/popular', (req, res) => {
  section = '/tv/popular';
  axiosRequest(section, res);
})

//4.1.15 recommended tv
router.get('/recommendation', cors(),(req, res) => {
  let id = req.query.id;
  section = `/tv/${id}/recommendations`;
  axiosRequest(section, res);
})

//4.1.16 similar tv
router.get('/similar', (req, res) => {
  let id = req.query.id;
  section = `/tv/${id}/similar`;
  axiosRequest(section, res);
})

//4.1.8 video of tv
router.get('/videos', (req, res) => {
  let id = req.query.id;
  section = `/tv/${id}/videos`;
  let url = TV_PREFIX + section;

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


//4.1.18 detail of tv
router.get('/details', (req, res) => {
  let id = req.query.id;
  section = `/tv/${id}`;
  let url = TV_PREFIX + section;

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
        "name": record.name,
        "genres": record.genres,
        "spoken_languages": record.spoken_languages,
        "first_air_date": record.first_air_date,
        "episode_run_time": record.episode_run_time,
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


//4.1.19 review of tv
router.get('/reviews', (req, res) => {
  let id = req.query.id;
  section = `/tv/${id}/reviews`;
  let url = TV_PREFIX + section;

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

        if(record.author_details.avatar_path == null || record.author_details.avatar_path.includes("http")){
          avatar_path = default_path;
        }else{
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


//4.1.20 cast of tv 
router.get('/cast', (req, res) => {
  let id = req.query.id;
  section = `/tv/${id}/credits`;
  let url = TV_PREFIX + section;

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
  let url = TV_PREFIX + section;
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
          "name": record.name,
          "media_type" : "tv",
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

