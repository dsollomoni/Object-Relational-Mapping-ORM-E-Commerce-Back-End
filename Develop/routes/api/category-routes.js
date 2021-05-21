const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [
      {
        model: Product,
        required: true,
      },
    ],
  });
  let response = categories.map((category) => {
    let temp = {};
    temp["id"] = category.dataValues.id;
    temp["category_name"] = category.dataValues.category_name;
    temp["products"] = category.dataValues.products;
    return temp;
  });
  res.send(response).status(200);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [
      {
        model: Product,
        required: true,
      },
    ],
  });

  let response = {};
  response["id"] = categories[0].dataValues.id;
  response["category_name"] = categories[0].dataValues.category_name;
  response["products"] = categories[0].dataValues.products;

  res.send(response).status(200);
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
    res.send(new_category.dataValues).status(200);
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
    res.status(200).send(category);
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
