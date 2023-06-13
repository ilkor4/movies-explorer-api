const Movie = require('../models/movie');

const CodeError = require('../errors/code-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user.id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new CodeError('Неправильно заполнены поля при создания фильма.'));
      else next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .populate('owner')
    .then((movie) => {
      if (!movie) next(new NotFoundError('Фильм не неайден'));
      else if (String(movie.owner._id) === String(req.user.id)) {
        movie.deleteOne()
          .then(() => res.send({ message: 'Фильм успешно удалён' }))
          .catch(next);
      } else next(new ForbiddenError('Доступ запрещён.'));
    })
    .catch(next);
};
