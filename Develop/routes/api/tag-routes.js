const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: [
      {
        model: ProductTag,
        required: true,
        attributes: [["id", "product_tag_id"]],
        include: [
          {
            model: Product,
            required: true,
            attributes: [
              ["id", "product_id"],
              "product_name",
              "price",
              "stock",
              "category_id",
            ],
          },
        ],
      },
    ],
    attributes: ["id", "tag_name"],
  });
  // console.log(tags)
  let response = [];
  tags.forEach((tag) => {
    let temp = {};
    temp["tag_name"] = tag.dataValues.tag_name;
    temp["products"] = tag.dataValues.product_tags;
    temp["id"] = tag.dataValues.id;
    response.push(temp);
  });
  res.send(response).status(200);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: [
      {
        model: ProductTag,
        required: true,
        attributes: [["id", "product_tag_id"]],
        include: [
          {
            model: Product,
            required: true,
            attributes: [
              ["id", "product_id"],
              "product_name",
              "price",
              "stock",
              "category_id",
            ],
          },
        ],
      },
    ],
    where: {
      id: req.params.id,
    },
    attributes: ["id", "tag_name"],
  });
  // console.log(tags)
  let response = [];
  tags.forEach((tag) => {
    let temp = {};
    temp["tag_name"] = tag.dataValues.tag_name;
    temp["products"] = tag.dataValues.product_tags;
    temp["id"] = tag.dataValues.id;
    response.push(temp);
  });
  res.send(response[0]).status(200);
});

router.post("/", async (req, res) => {
  // create a new tag
  if (!req.body.tag_name) {
    res.status(500).send("Failed to create new tag. Missing tag_name.");
    return;
  }
  let new_tag = await Tag.create({
    tag_name: req.body.tag_name,
  });
  if (new_tag instanceof Tag) {
    res.send(new_tag.dataValues).status(200);
  } else {
    res.status(500).send("Failed to add tag");
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  if (!req.body.tag_name) {
    res
      .status(500)
      .send("Failed to update tag. tag_name missing from req.body");
    return;
  }
  let tag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (tag[0]) {
    res.status(200).send(tag);
  } else {
    res.status(500).send("Failed to update tag.");
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  let tag = await Tag.destroy({
    where: { id: req.params.id },
  });
  if (tag) {
    res.status(200).send(`${req.params.id} has been deleted`);
  } else {
    res.status(500).send("Failed to delete tag.");
  }
});

module.exports = router;
