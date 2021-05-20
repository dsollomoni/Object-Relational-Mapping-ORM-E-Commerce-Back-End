const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Product.findAll({
    include: [
      {
        model: Category,
        required: true
      }
    ],
    // where: {
    //   category_id: "id"
    // }
  });
  let response = {}
    categories.forEach((category) => {
    // return {
    //    category_name: category.dataValues.category.category_name, 
    //    product_name: category.dataValues.product_name
    //   }
    if (response.hasOwnProperty(category.dataValues.category.category_name)){
      response[category.dataValues.category.category_name].push(category.dataValues.product_name)
    } else {
      let t = []
      t.push(category.dataValues.product_name)
      response[category.dataValues.category.category_name] = t
    }
   })
   console.log(response)
   res.json(response).status(200);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categories = await Product.findAll({
    include: [
      {
        model: Category,
        required: true
      }
    ],
     where: {
       category_id: req.params.id
     }
  });
  let response = {}
    categories.forEach((category) => {
    // return {
    //    category_name: category.dataValues.category.category_name, 
    //    product_name: category.dataValues.product_name
    //   }
    if (response.hasOwnProperty(category.dataValues.category.category_name)){
      response[category.dataValues.category.category_name].push(category.dataValues.product_name)
    } else {
      let t = []
      t.push(category.dataValues.product_name)
      response[category.dataValues.category.category_name] = t
    }
   })
   console.log(response)
   res.json(response).status(200);
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
