import { Router } from 'express';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = await req.context.models.User.create({
      status: req.body.status,
      total: req.body.total,
      
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const token = await req.context.models.User.generateAuthToken(
      user,
    );
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
