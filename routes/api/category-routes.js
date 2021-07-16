const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product], 

  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err));

  
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
Category.findByPk({
  where: {
    id: req.params.id,
},
include: [Product],

})
.then((category) => res.json(category))
  .catch((err) => res.status(500).json(err));

});

  /*try {
    const categoryData = await Category.findOne(req.params.id, {
      include: [{ model: Category, through: Product, as: 'product_category'}]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'no category found with this id'});
      return;
    }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
*/



router.post('/', async(req, res) => {
  // create a new category
  // Category.create(req.body)
  // .then((category) => res.status(200).json(category))
  // .catch((err) => res.status(500).json(err));

  
  
  
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

 
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
  },
  
  })


    .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));



  // try {
  //   const categoryData = await Category.update(req.body);
  //   res.status(200).json(categoryData);
  // }catch(err) {
  //   res.status(400).json(err);
  // }


});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value

  try {
    const categoryData = await Category.destroy({
      where: {
        id:req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({message: 'no category found with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err)
 {
   res.status(500).json(err);
 }
 });
module.exports = router;
