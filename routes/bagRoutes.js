const express = require("express");
const {
  showBag,
  createBag,
  showEditBag,
  deleteBag,
  editBag,
} = require("../controllers/bagController");
const bagRoutes = express.Router();

bagRoutes.get("/bag", showBag);
bagRoutes.post("/bag", createBag);
bagRoutes.get("/editbag/:id", showEditBag);
bagRoutes.post("/bag/:id", editBag);
bagRoutes.post("/delbag/:id", deleteBag);

module.exports = {
  bagRoutes,
};
