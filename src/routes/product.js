import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const products = await req.context.models.Product.findAll();
  return res.send(products);
});

router.post('/', async (req, res) => {
  const product = await req.context.models.Product.create({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then(function (result) {
      return res.status(201).json(result);
    })
    .catch(function (error) {
      return res.json({ error: error });
    });
});

router.get('/:productId', async (req, res) => {
  const product = await req.context.models.Product.findByPk(
    req.params.productId,
  );
  return res.send(product);
});

router.delete('/:productId', async (req, res) => {
  const user = await req.context.models.Product.destroy(
    { where: {
      id: req.params.productId
   }}
  );
  return res.send(user);
});

router.delete('/:productId', async (req, res) => {
  const user = await req.context.models.Product.destroy({
    where: {
      id: req.params.productId,
    },
  });
  return res.send(user);
});



export default router;
