const mapProperties = require("../utils/map-properties");
const db = require("../db/connection");

const tableName = "reviews";


const mapCritic = mapProperties({
  surname: "critic.surname",
  preferred_name: "critic.preferred_name",
  critic_id: "critic.critic_id",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

async function destroy(reviewId) {
  // TODO: Write your code here
  return db(tableName).where('review_id', reviewId).del();
}

async function list(movie_id) {
  // TODO: Write your code here
  return db("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*").where({"r.movie_id": movie_id})
    .then((reviews) => reviews.map(review => mapCritic(review)))
}

async function read(reviewId) {
  // TODO: Write your code here
  return db("reviews").select("*").where({review_id: reviewId}).first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
