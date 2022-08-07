import { Router } from 'express';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, async (req, res) => {
  const products = await req.context.models.Product.findAll();
  return res.send(products);
});

router.post('/', auth, async (req, res) => {
  req.context.models.Product.create({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    code: req.body.code,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then(function (result) {
      return res.status(201).json(result);
    })
    .catch(function (error) {
      return res.status(400).json({ error: error });
    });
});

router.patch('/:productId', auth, async (req, res) => {
  req.context.models.Product.update(
    {
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      updatedAt: new Date(),
    },
    { where: { _id: req.params.productId } },
  )
    .then(function (result) {
      return res.status(200).json(result);
    })
    .catch(function (error) {
      return res.status(400).json({ error: error });
    });
});

router.get('/:productId', auth, async (req, res) => {
  const product = await req.context.models.Product.findByPk(
    req.params.productId,
  );
  try {
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

router.delete('/:productId', auth, async (req, res) => {
  const product = req.context.models.Product.destroy({
    where: {
      id: req.params.productId,
    },
  });

  try {
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

export default router;
