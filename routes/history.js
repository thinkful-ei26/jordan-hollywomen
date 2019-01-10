const express = require('express');
const mongoose = require('mongoose');

const History = require('../models/history');


const router = express.Router();

//get all recent searches (get)
router.get('/history', (req, res, next) => {
    // const { searchTerm } = req.query;

    History.find()
    .sort({ searchDate: 'desc' })
    .then(history => {
        res.json(history);
    })
    .catch(err => {
        next(err);
    })
});

//add to recent searches (post)
router.post('/history', (req, res, next) => {
    const { searchTerm, searchDate } = req.body;

    if (!searchTerm) {
        const err = new Error('Missing `search term` in request body');
        err.status = 400;
        return next(err);
      }
 
    const newSearch = {
        searchTerm: searchTerm,
        searchDate: searchDate
    }

    History.create(newSearch)
    .then(results => {
        res.location(`http://${req.headers.host}/history/${results}`).status(201).json(results);    
    })
    .catch(err => {
        next(err);
      newSearch.save();
      })
    });