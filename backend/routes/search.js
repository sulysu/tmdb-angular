const express = require('express');
const axios = require('axios');
const router = express.Router();
var config = require('./config');


//4.1.1 search
router.get('/', (req, res) => {
  let keywords = req.query.keywords;
  axios.get('https://api.themoviedb.org/3/search/multi', {
    params: {
      api_key : config.API_KEY,
      language: config.LAN,
      query : keywords,
    }
  })
  .then((response) => {
    let results =response.data.results;
    let res_arr = [];

    results.forEach(record => {
      let id = record.id;
      if(record.backdrop_path == null){
        return;
      }
      let backdrop_path = config.BACKDROP_PREFIX + record.backdrop_path;
      
      let media_type = record.media_type;
      let name = (media_type == "movie") ? record.title : record.name;
 
      let dict = {
        "id" : id,
        "name" : name,
        "backdrop_path": backdrop_path,
        "media_type":media_type,
      };
      res_arr.push(dict);
    });
    res.json(res_arr);      
  })
  .catch((error) => {
    console.log(error);
  });
});

module.exports = router;