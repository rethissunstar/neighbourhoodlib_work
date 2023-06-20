const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Books } = require('../../models');
const withAuth = require('../../utils/auth');
const QRCode = require('qrcode');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Books.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newBook = await Books.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/createRquest', withAuth, async (req, res) => {

  try {


    await sequelize.query('UPDATE books set book_status=:new_status where book_id=:book_id', {
      replacements: { new_status: 'Unavailable', book_id: req.body.book_id },
      type: sequelize.UPDATE

    });

    await sequelize.query('INSERT INTO booksout (borrow_person_id, book_lent, borrow_date, estimated_due, request_state) ' +
      'VALUES (:borrow_person_id, :book_lent, now(), :estimated_due, :request_state);', {
      replacements: { borrow_person_id: req.body.user_id, book_lent: req.body.book_id, estimated_due: req.body.due_date, request_state: 'Pending' },
      type: sequelize.INSERT

    });
    try {
      const [result, metadata] = await sequelize.query('SELECT ref_num FROM booksout order by ref_num DESC LIMIT 1;', {

        plain: false,
        raw: true,
        type: sequelize.SELECT
      });

      var ref_num = result[0].ref_num;
      var url = 'https://neighbourhood-library-65950eb0f456.herokuapp.com/loanApproval/' + ref_num;


    } catch (err) {
      res.status(500).json(err);
    }

    QRCode.toFile('./public/qr/' + ref_num + '.png', url, {
      errorCorrectionLevel: 'H'
    }, function (err) {
      if (err) throw err;
      console.log('QR code saved!');
    });



    res.status(200).json(req.body.due_date);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/addBook', withAuth, async (req, res) => {

  try {
      var query = 'INSERT INTO books (title, author, genre, book_synopsis, part_of_series, book_status, book_owner) ' +
      ' VALUES (:title, :author, :genre, :book_synopsis, :part_of_series, :book_status, :user_id)';
      await sequelize.query(query, {
        replacements: { title:req.body.title , author:req.body.author, genre:req.body.genre, book_synopsis:req.body.synopsis, part_of_series:req.body.series, book_status:'available' ,user_id:req.session.user_id },
        type: sequelize.INSERT

      });

    res.status(200).json(query);
  } catch (err) {
    res.status(400).json(err);
  }

});

module.exports = router;
