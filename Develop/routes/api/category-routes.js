const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Product.findAll({
    include: [
      {
        model: Category,
        required: true,
      },
    ],
  });
  let response = {};
  categories.forEach((category) => {
    if (response.hasOwnProperty(category.dataValues.category.category_name)) {
      response[category.dataValues.category.category_name].push(
        category.dataValues.product_name
      );
    } else {
      let t = [];
      t.push(category.dataValues.product_name);
      response[category.dataValues.category.category_name] = t;
    }
  });
  console.log(response);
  res.json(response).status(200);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categories = await Product.findAll({
    include: [
      {
        model: Category,
        required: true,
      },
    ],
    where: {
      category_id: req.params.id,
    },
  });
  let response = {};
  categories.forEach((category) => {
    if (response.hasOwnProperty(category.dataValues.category.category_name)) {
      response[category.dataValues.category.category_name].push(
        category.dataValues.product_name
      );
    } else {
      let t = [];
      t.push(category.dataValues.product_name);
      response[category.dataValues.category.category_name] = t;
    }
  });
  console.log(response);
  res.json(response).status(200);
});

router.post("/", async (req, res) => {
  // create a new category
  if (!req.body.category_name) {
    res
      .status(500)
      .send("Failed to add category. category_name missing from req.body");
    return;
  }
  let new_category = await Category.create({
    category_name: req.body.category_name,
  });
  if (new_category instanceof Category) {
    res.send(`${req.body.category_name} was added!`).status(200);
  } else {
    res.status(500).send("Failed to add category");
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  if (!req.body.category_name) {
    res
      .status(500)
      .send("Failed to update category. category_name missing from req.body");
    return;
  }
  let category = await Category.update(
    {
      category_name: req.body.category_name,
    },
    { where: { id: req.params.id } }
  );
  if (category[0]) {
    res.status(200).send(`${req.params.id} has been updated`);
  } else {
    res.status(500).send("Failed to update category.");
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  let category = await Category.destroy({
    where: { id: req.params.id },
  });
  if (category) {
    res.status(200).send(`${req.params.id} has been deleted`);
  } else {
    res.status(500).send("Failed to delete category.");
  }
});

module.exports = router;
