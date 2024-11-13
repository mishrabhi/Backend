const express = require("express");
const Movie = require("../schema/movie.model");

const router = express.Router();

//Add new movie
router.post("/", async (req, res) => {
  const { title, description, genre, rating, productUrl } = req.body;
  try {
    const newMovie = new Movie({
      title,
      description,
      genre,
      rating,
      productUrl,
    });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: `Error adding new movie`, error });
  }
});

//Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: `Error fetching movies`, error });
  }
});

//Update single movie
router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: `Error updating movie`, error });
  }
});

//Delete movie
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: `Movie deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error deleting movie`, error });
  }
});

module.exports = router;
