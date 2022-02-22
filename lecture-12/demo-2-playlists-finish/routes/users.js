import mongoose from "mongoose";
import express from 'express';
var router = express.Router();

// Add a user
router.post('/', async function(req, res, next) {
  res.json({});
});

// get json data for all users
router.get('/', async function(req, res, next) {
  res.json({});
});

export default router;
