// TODO útfæra proxy virkni

import express, { json } from 'express';
import fetch from 'node-fetch';

export const router = express.Router();

router.get('/proxy', async (req,res,next)=>{
    const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${req.query.type}_${req.query.period}.geojson`;
    let result;
    try {
        result = await fetch(url);
    } catch(e) {
        return next();
    }
    const text = await result.text();
    const data = {
        data: JSON.parse(text),
        info: {
            cached: false,
            time: 0.5
        },
    };
    res.json(data);
});