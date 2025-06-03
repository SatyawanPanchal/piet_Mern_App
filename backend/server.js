// backend/server.js (with "type": "module" in package.json)

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const PORT=5000;

const app = express();      // create an express app instance

app.use(cors());            // allow cross origin requests
app.use(express.json());    //accept and parse incoming requests in json format

mongoose.connect('mongodb://127.0.0.1:27017/quotesDB');     // connecting with mongodb using string

const quoteSchema = new mongoose.Schema({ text: String });     //Defines a schema (blueprint) for the "Quote"

const Quote = mongoose.model('Quote', quoteSchema);            //lets you interact with the quotes collection in MongoDB (like insert, find, etc.).


app.get('/quotes', async (req, res) => {
  const quotes = await Quote.find();          //Finds all quotes in the database using Quote.find().
  res.json(quotes);                           //Sends them back as a JSON response
});

app.post('/quotes', async (req, res) => {
  
  const newQuote = new Quote({ text: req.body.text });     // read a request from body
  await newQuote.save();                                   // save using Quote Model 
  res.json({ status: 'Quote saved' });                     // sending the status 
});

app.listen(5000, () => {
  console.log('Well folks!! Backend is  running on port',PORT);
});
