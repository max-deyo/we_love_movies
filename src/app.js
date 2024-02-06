if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// TODO: Add your code here

app.use(express.json());
app.use(cors())
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` })
});

app.use((error, req, res, next) => {
  const { 
    status = 500, 
    message = 'Something went wrong!' 
  } = error;
  res.status(status).json({ error: message });
});


module.exports = app;
