import { Router } from 'express';
import _ from 'lodash';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const orderDetile = await req.context.models.OrderDetile.create(
      {
        product: await req.context.models.Product.findByPk(
          req.body.product_id,
        ),
        quantity: req.body.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [req.context.models.Product],
      },
    );

    return res.status(201).json(orderDetile);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
