const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  response.json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
