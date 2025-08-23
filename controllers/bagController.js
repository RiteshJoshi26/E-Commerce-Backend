const { Bag } = require("../models/bagModel");

async function showBag(req, res) {
  const showBag = await Bag.find();
  res.render("addbag", { showBag });
}

async function createBag(req, res) {
  const { bagName, imgurl, price } = req.body;
  const createBag = await Bag.create({
    bagName,
    imgurl,
    price,
  });
  res.redirect("/admin/bag");
}

async function showEditBag(req, res) {
  const id = req.params.id;
  const getBag = await Bag.findById(id);
  res.render("edit", { getBag });
}

async function editBag(req, res) {
  const { bagName, price, imgurl } = req.body;
  const id = req.params.id;
  const upBag = await Bag.findByIdAndUpdate(
    id,
    { bagName, price, imgurl },
    { new: true }
  );
  console.log(upBag);
  res.redirect("/admin/bag");
}

async function deleteBag(req, res) {
  const id = req.params.id;
  const delBag = await Bag.findByIdAndDelete(id);
  res.redirect("/admin/bag");
}

module.exports = {
  showBag,
  createBag,
  showEditBag,
  editBag,
  deleteBag,
};
