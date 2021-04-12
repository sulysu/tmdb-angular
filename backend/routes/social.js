const express = require('express');
const axios = require('axios');
const router = express.Router();
var config = require('./config');

const URL_PREFIX = 'https://api.themoviedb.org/3';
//4.2.1 twitter
router.get('/twitter', (req, res) => {
  let id = req.query.id;
  let media_type = req.query.media_type;
  let video_key = req.query.video_key;
  getDetails(id,video_key, media_type,res);

})

//4.2.2 facebook
router.get('/facebook', (req, res) => {
  let video_key = "https://www.youtube.com/watch?v=" + req.query.video_key;
  res.json({"video": video_key});
})

module.exports = router;

function getDetails(id, video_key, media_type, res){
  let details = {}
  let type;
  let index;
  if(media_type == "movie"){
    type = `/movie/${id}`;
    index = "title";
  }else{
    type = `/tv/${id}`;
    index = "name";
  }

  let url = URL_PREFIX + type;
  axios.get(url, {
    params: {
      api_key: config.API_KEY,
      language: config.LAN,
      page: config.PAGE,
    }
  })
    .then((response) => {
      let record = response.data;
      details.title = record[index];
      details.video = `https://www.youtube.com/watch?v=${video_key}`
      res.json(details);
    })
    .catch((error) => {
      console.log(error);
    })

}
