// TODO útfæra proxy virkni

import express, { json } from 'express';
import fetch from 'node-fetch';

export const router = express.Router();

router.get('/proxy', async (req,res)=>{
    const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${req.query.type}_${req.query.period}.geojson`;
    let result;
    try {
        result = await fetch(url);
    } catch(e) {
        console.error(e);
    }
    const texti = await result.text();
    const gogn = {
        data: JSON.parse(texti),
        info: {
            cached: false,
            time: 0.5
        },
    };
    res.json(gogn);
});