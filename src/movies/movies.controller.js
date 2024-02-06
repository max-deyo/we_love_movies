const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const { movieId } = request.params;
  const movie = await service.read(movieId);
  if (movie && movie != null) {
    response.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: 'Movie cannot be found.' });
}

async function read(request, response) {
  // TODO: Add your code here
  response.status(200).json({ data: response.locals.movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  const { is_showing } = request.query;
  response.json({ data: await service.list(is_showing) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
