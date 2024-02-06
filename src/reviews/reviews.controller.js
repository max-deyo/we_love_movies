const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  
  const { reviewId } = request.params;
  const review = await service.read(reviewId);
  
  if (review) {
    response.locals.review = review;
    return next();
  }
  
  return next({ status: 404, message: "Review cannot be found." });
}

async function destroy(request, response) {
  // TODO: Write your code here
  
  const review = response.locals.review;
  
  await service.destroy(review.review_id);
  response.sendStatus(204);
}

async function list(request, response) {
  // TODO: Write your code here
  const { movieId } = request.params;
  response.status(200).json({ data: await service.list(movieId) });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
  const requestData = request.body.data;
  requestData.review_id = request.params.reviewId;
  const data = await service.update(requestData)
  response.status(200).json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
