// TODO útfæra proxy virkni

import express from 'express';
import fetch from 'node-fetch';
import { timerStart, timerEnd } from './time.js';
//import { get, set } from './cache.js';

export const router = express.Router();

function head(type, period) {
  let string1;
  let string2;
  switch (type) {
    case 'significant':
      string1 = 'Verulegir jarðskjálftar, ';
      break;
    case 'all':
      string1 = 'Allir jarðskjálftar, ';
      break;
    default:
      string1 = `${type}+ á richter jarðskjálftar, `;
  }

  switch (period) {
    case 'hour':
      string2 = 'seinustu klukkustund.';
      break;
    case 'day':
      string2 = 'seinasta dag.';
      break;
    case 'week':
      string2 = 'seinustu viku.';
      break;
    default:
      string2 = 'seinasta mánuð.';
  }

  return string1 + string2;
}

router.get('/proxy', async (req, res, next) => {
  const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${req.query.type}_${req.query.period}.geojson`;
  const key = `${req.query.type}_${req.query.period}`;
  let result;
  /*let timer = timerStart();

  result = await get(key);
  if (result) {
    const data = {
      headers: result.headers,
      data: result.data,
      info: {
        cached: true,
        elapsed: timerEnd(timer),
      },
    };
    return res.json(data);
  }*/
  timer = timerStart();
  try {
    result = await fetch(url);
  } catch (e) {
    return next();
  }
  const text = await result.text();
  const data = {
    headers: head(req.query.type, req.query.period),
    data: JSON.parse(text),
    info: {
      cached: false,
      elapsed: timerEnd(timer),
    },
  };
  //set(key, data, 120);
  return res.json(data);
});
