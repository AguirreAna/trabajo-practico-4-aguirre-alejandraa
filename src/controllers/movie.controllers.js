import { Movie } from "../models/movie.model.js";

//  Validaciones comunes
const validarDatos = (data) => {
  const { title, genre, duration, year, synopsis } = data;

  if (!title || !genre || !duration || !year) {
    return "Todos los campos obligatorios (title, genre, duration, year) deben estar completos.";
  }

  if (!Number.isInteger(duration) || duration <= 0) {
    return "La duración debe ser un número entero mayor a 0.";
  }

  const currentYear = new Date().getFullYear();
  if (!Number.isInteger(year) || year < 1888 || year > currentYear) {
    return"El año debe ser un número entero de 4 dígitos entre 1888 y ${currentYear}.";
  }

  if (synopsis && typeof synopsis !== "string") {
    return "La sinopsis debe ser una cadena de texto.";
  }

  return null; // sin errores
};

// GET todas las películas
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las películas." });
  }
};

//  GET película por ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada." });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la película." });
  }
};

//  POST crear película
export const createMovie = async (req, res) => {
  try {
    const errorValidacion = validarDatos(req.body);
    if (errorValidacion) {
      return res.status(400).json({ error: errorValidacion });
    }

    const existeTitulo = await Movie.findOne({ where: { title: req.body.title } });
    if (existeTitulo) {
      return res.status(400).json({ error: "Ya existe una película con ese título." });
    }

    const nuevaPelicula = await Movie.create(req.body);
    res.status(201).json(nuevaPelicula);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la película." });
  }
};

//  PUT actualizar película
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada." });
    }

    const errorValidacion = validarDatos(req.body);
    if (errorValidacion) {
      return res.status(400).json({ error: errorValidacion });
    }

    if (req.body.title) {
      const existeTitulo = await Movie.findOne({ where: { title: req.body.title } });
      if (existeTitulo && existeTitulo.id !== movie.id) {
        return res.status(400).json({ error: "Ya existe una película con ese título." });
      }
    }

    await movie.update(req.body);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la película." });
  }
};

//  DELETE eliminar película
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada." });
    }

    await movie.destroy();
    res.json({ message: "Película eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la película." });
  }
};