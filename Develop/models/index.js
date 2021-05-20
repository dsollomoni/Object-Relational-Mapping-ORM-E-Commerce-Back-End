// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category)
// Categories have many Products
Category.hasMany(Product)
// Products belongToMany Tags (through ProductTag)
Product.hasMany(ProductTag)
// Tags belongToMany Products (through ProductTag)
Tag.hasMany(ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
