const router = require('express').Router();
const { Participants } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const participantData = await Participants.create(req.body);

    req.session.save(() => {
      req.session.user_id = participantData.person_id;
      req.session.logged_in = true;

      res.status(200).json(participantData);
    });

  } catch (err) { 
    console.log(err);
    res.status(400).json(err);
  } 
});

router.post('/login', async (req, res) => {
  try {
    const participantData = await Participants.findOne({ where: { email: req.body.email } });
    if (!participantData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await participantData.checkPassword(req.body.user_pass);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = participantData.person_id;
      req.session.logged_in = true;
      
      res.json({ particpants: participantData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
