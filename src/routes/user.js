import { Router } from 'express';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = await req.context.models.User.create({
      username: req.body.username,
      password: req.body.password,
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
  //
});

router.post('/login', async (req, res) => {
  try {
    let user = await req.context.models.User.findOne({
      where: { username: req.body.username },
    });

    if (!user) res.status(404).json({ error: 'Username not found' });
    const isValidated = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!isValidated) {
      throw 'Username and password is wrong';
    }

    const token = await req.context.models.User.generateAuthToken(
      user,
    );
    user = _.pick(user, ['username']);
    res.status(200).json({ user, token });
  } catch (e) {
    res.status(401).json({ error: e });
  }
});

export default router;
