const router = require('express').Router();
const sequelize = require('../config/connection');
const { Participants } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    res.render('homepage', {
      // projects, 
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/addBook',withAuth ,async (req, res) => {
  try {

    res.render('addBook', {
      // projects, 
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



//route for changing status of borrow status
router.get('/loanApproval/:idReq', async (req, res) => {

  try {

    await sequelize.query('UPDATE booksout set request_state=:new_state where ref_num=:ref_num', {
      replacements: { new_state: 'Approved', ref_num: req.params.idReq },
      type: sequelize.UPDATE

    });


    // //get the information and send loan information to the front end
    const [result, metadata] = await sequelize.query('SELECT participants.first_name, books.title, booksout.estimated_due, booksout.request_state, (select first_name from participants where person_id=books.book_owner) as owner_name ' +
      'FROM booksout ' +
      'INNER JOIN participants ' +
      'ON participants.person_id = booksout.borrow_person_id ' +
      'INNER JOIN books ' +
      'ON booksout.book_lent=books.book_id ' +
      'WHERE booksout.ref_num= :num_ref', {

      replacements: { num_ref: req.params.idReq },
      // If plain is true, then sequelize will only return the first
      // record of the result set. In case of false it will return all records.
      plain: false,

      //   // Set this to true if you don't have a model definition for your query.
      raw: true,

      // The type of query you are executing. The query type affects how results are formatted before they are passed back.
      type: sequelize.SELECT
    });

    res.render('requestApproval', {
      ...result[0]
    });


    //res.send('working');
  } catch (err) {
    res.status(500).json(err);
  }

})


// // Use withAuth middleware to prevent access to route
// router.get('/books', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const participantData = await Participants.findByPk(req.session.user_id, {
//       attributes: { exclude: ['user_pass'] },
//     });

//     console.log(participantData);
//     const user = participantData.get({ plain: true });

//     res.render('books', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/books');
    return;
  }

  res.render('login');
});


router.get('/borrowBook', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const participantData = await Participants.findByPk(req.session.user_id, {
      attributes: { exclude: ['user_pass'] },
    });

    console.log(participantData);
    const user = participantData.get({ plain: true });

    res.render('borrowBook', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/borrowBooks/requestLoan/:id', withAuth, async (req,res)=>{

  try {
    const [result, metadata] = await sequelize.query('SELECT participants.first_name, participants.last_name ,books.title, books.author, books.genre, books.book_synopsis, books.part_of_series, books.book_id '+
      'FROM books '+
      'INNER JOIN participants '+
      'ON participants.person_id = books.book_owner '+
      'WHERE books.book_id=:book_id', {
        
      replacements: { book_id: req.params.id },
      plain: false,
      raw: true,
      type: sequelize.SELECT
    });

      res.render('bookOverview', {
        ...result[0],
        user_id:req.session.user_id,
        logged_in: true
      });

    //res.send(result[0]);

  } catch (err) {
    res.status(500).json(err);
  }
  
});


router.get('/search', withAuth, async (req, res) => {
  try {
    const query = req.query.q;

    var sql = '';


    if (query != '') {
      sql = `SELECT * FROM books WHERE (title LIKE '%${query}%' OR author LIKE '%${query}%' OR genre LIKE '%${query}%' OR part_of_series LIKE '%${query}%' ) AND book_owner!=${req.session.user_id} AND book_status='available'`;
    }
    else {
      sql = `SELECT * FROM books WHERE book_owner!=${req.session.user_id} AND book_status='available' ORDER BY book_id`;
    }




    // //get the information and send loan information to the front end
    const [results, metadata] = await sequelize.query(sql, {
      plain: false,
      raw: true,
      type: sequelize.SELECT
    });

    res.send(results);

  } catch (err) {
    res.status(500).json(err);
  }




});

router.get('/myBooks/search', withAuth, async (req, res) => {
  // try {
  //   const query = req.query.q;

  //   var sql = '';
  //   // sql = `SELECT * FROM books WHERE book_owner=${req.session.user_id} ORDER BY book_id`;

  //   if (query != '') {
  //     sql = `SELECT * FROM books WHERE (title LIKE '%${query}%' OR author LIKE '%${query}%' OR genre LIKE '%${query}%' OR part_of_series LIKE '%${query}%' ) AND book_owner=${req.session.user_id}`;
  //   }
  //   else {
  //     sql = `SELECT * FROM books WHERE book_owner=${req.session.user_id} ORDER BY book_id`;
  //   }




  //   // //get the information and send loan information to the front end
  //   const [results, metadata] = await sequelize.query(sql, {
  //     plain: false,
  //     raw: true,
  //     type: sequelize.SELECT
  //   });

  //   res.send(results);

  // } catch (err) {
  //   res.status(500).json(err);
  // }




});


router.get('/books', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const participantData = await Participants.findByPk(req.session.user_id, {
      attributes: { exclude: ['user_pass'] },
    });
    console.log(participantData);
    const user = participantData.get({ plain: true });
    res.render('myBook', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/showBooks', withAuth, async (req, res) => {
   
    try {
      const query = req.query.q;
  
      var sql = '';
      // sql = `SELECT * FROM books WHERE book_owner=${req.session.user_id} ORDER BY book_id`;
  
      if (query != '') {
        sql = `SELECT * FROM books WHERE (title LIKE '%${query}%' OR author LIKE '%${query}%' OR genre LIKE '%${query}%' OR part_of_series LIKE '%${query}%' ) AND book_owner=${req.session.user_id}`;
      }
      else {
        sql = `SELECT * FROM books WHERE book_owner=${req.session.user_id} ORDER BY book_id`;
      }
  
  
  
  
      // //get the information and send loan information to the front end
      const [results, metadata] = await sequelize.query(sql, {
        plain: false,
        raw: true,
        type: sequelize.SELECT
      });
  
      res.send(results);
  
    } catch (err) {
      res.status(500).json(err);
    }
  
    
});

module.exports = router;
