const express = require('express');
const axios = require('axios');
const router = express.Router();
var config = require('./config');

const URL_PREFIX = 'https://api.themoviedb.org/3';

//4.1.21 cast details
router.get('/details', (req, res) => {
  let id = req.query.id;
  let url = URL_PREFIX + `/person/${id}`;
  console.log("url ", url);
  axios.get(url, {
    params: {
      api_key: config.API_KEY,
      language: config.LAN,
      page: config.PAGE,
    }
  })
    .then((response) => {
      let record = response.data;
      let aka;
      if (record.also_known_as.length == 0) {
        aka = null;
      } else {
        aka = "";
        record.also_known_as.forEach(element => {
          aka += element + ",";
        });
        aka = aka.slice(0, aka.length-1);
      }
      let gender_name;
      
      switch(record.gender){
        case 0: {
          gender_name = null;
          break;
        }
        case 1:{
          gender_name = "Male";
        }
        case 2:{
          gender_name = "Female";
        }
      }

      let details = {
        "birthday": record.birthday,
        "birth_place": record.place_of_birth,
        "gender": gender_name,
        "name": record.name,
        "homepage": record.homepage,
        "also_known_as": aka,
        "known_for_department": record.known_for_department,
        "biography": record.biography
      }
      res.json(details);
    })
    .catch((error) => {
      console.log(error);
    });
})

//4.1.22 externel ids
router.get('/external_ids', (req, res) => {
  let id = req.query.id;
  let url = URL_PREFIX + `/person/${id}/external_ids`;
  axios.get(url, {
    params: {
      api_key: config.API_KEY,
      language: config.LAN,
      page: config.PAGE,
    }
  })
    .then((response) => {
      let record = response.data;
      let imdb_id = record.imdb_id? "https://www.imdb.com/name/" + record.imdb_id: null;
      let fb_id = record.facebook_id? "https://www.facebook.com/" + record.facebook_id: null;
      let ins_id = record.instagram_id?"https://www.instagram.com/" + record.instagram_id: null;
      let twitter_id = record.twitter_id?"https://www.twitter.com/" + record.twitter_id: null;

      let details = {
        "imdb_id": imdb_id,
        "facebook_id": fb_id,
        "instagram_id": ins_id,
        "twitter_id": twitter_id,
      }
      res.json(details);
    })
    .catch((error) => {
      console.log(error);
    });
})

module.exports = router;