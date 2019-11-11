var express = require('express');
var router = express.Router();
let User = require('../models/user')
let Book = require('../models/book')
const passport = require('passport');
const auth = require('../tools/auth');

// first page

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// login

router.get('/login', function (req, res, next) {
  res.render('login', {
    msg: 'Express'
  });
});

// sign up

router.get('/signup', function (req, res, next) {
  res.render('signup.ejs', {
    msg: 'null'
  });
});

// add user

router.post('/addUser', async (req, res) => {
  console.log(req.body);

  if (!req.body.firstName || !req.body.mobile || !req.body.lastName || !req.body.password || !req.body.userName ||
    !req.body.gender) {
    return res.json({
      success: false,
      msg: "empty field"
    });

  };

  if (req.body.password.length < 2 || req.body.password.length > 20) {
    return res.json({
      success: false,
      msg: "password length"
    });
  }

  User.findOne({
    mobile: req.body.mobile
  }, (err, existUser) => {

    if (err) return res.json({
      success: false,
      msg: 'user not save',
      err
    });
    if (existUser) return res.json({
      success: false,
      msg: 'mobile number already token'
    })

    const NEW_USER = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      mobile: req.body.mobile,
      userName: req.body.userName,
      gender: req.body.gender,
    });

    NEW_USER.save((err, user) => {
      if (err) return res.json({
        success: false,
        msg: 'user not save',
        err
      });

      return res.json({
        success: true,
        msg: 'user added',
        user
      })
    });
  });
});

// dashboard

router.post('/profile', passport.authenticate('local'), async (req, res, next) => {
  try {

    User.findOne({
      mobile: req.body.mobile
    }, (err, user) => {
      if (err) res.json({
        success: false,
        msg: 'not found'
      });
      if (user.role === "admin") {
        res.render('adminProfile', {
          message: user,
          msg: null
        })
      } else {
        res.render('userProfile', {
          user: user,
          msg: null
        })
      }

    })
  } catch (err) {
    next(err);
  }


});

//search book

router.post('/search',  async (req, res) => {

  
 

    Book.find({ $or: [
      {id : req.body.id},
      {authers : req.body.authers},
      {subject : req.body.subject},
      {publisher : req.body.publisher} ,
      {price : req.body.price},

    ] }, (err, bookStore) => {
      
      if (err) res.json({
        bookStore: "DB Error"
      })
      return res.json({
        bookStore
        })
        
      })

      // Book.find( {authers : req.body.authers} , (err, bookStore) => {
      //   console.log(bookStore)
      //   if (err) res.json({
      //     bookStore: "DB Error"
      //   })
      //   return res.json({
      //     bookStore
      //     })
          
      //   })

      //   Book.find( {subject : req.body.subject} , (err, bookStore) => {
      //     console.log(bookStore)
      //     if (err) res.json({
      //       bookStore: "DB Error"
      //     })
      //     return res.json({
      //       bookStore
      //       })
            
      //     })

      //     Book.find( {publisher : req.body.publisher} , (err, bookStore) => {
      //       console.log(bookStore)
      //       if (err) res.json({
      //         bookStore: "DB Error"
      //       })
      //       return res.json({
      //         bookStore
      //         })
              
      //       })

      //       Book.find( {price : req.body.price}, (err, bookStore) => {
      //         console.log(bookStore)
      //         if (err) res.json({
      //           bookStore: "DB Error"
      //         })
      //         return res.json({
      //           bookStore
      //           })
                
      //         })
  })


// add book

router.put('/addBook', (req, res) => {
  if (!req.body.authers || !req.body.subject || !req.body.publisher || !req.body.price || !req.body.id) {
    return res.json({
      success: false,
      msg: 'empty fields'
    });
  }
  
  Book.findOne({
    id: req.body.id
  }, (err, bookStore) => {
    if (err) return res.json({
      success: false,
      msg: 'DB Error'
    });
    if (bookStore) return res.json({
      success: false,
      msg: 'book already exist'
    })
  })
  var NEW_BOOK = new Book({
    id: req.body.id,
    authers: req.body.authers,
    subject: req.body.subject,
    publisher: req.body.publisher,
    price: req.body.price,
  });
  NEW_BOOK.save((err, book) => {
    if (err) return res.send('something went wrong')
    return res.json({
      book,
      msg: "book added successfuly"
    })
  })
});

//show book

router.get('/showAllbooks', (req, res) => {
  Book.find(({}), (err, bookStore) => {
    
    if (err) res.json({
      book: "DB Error"
    })
    return res.json({
      bookStore
    })
  })
});

// edit book

router.post('/editBook', async (req, res) => {
console.log( req.body.id)
  Book.updateOne({
    id: req.body.id
  }, {
    $set: {
      id: req.body.id,
      authers: req.body.authers,
      subject: req.body.subject,
      publisher: req.body.publisher,
      price: req.body.price
    }
  }, (err, bookStore) => {
    if (err) res.json({
      success: false,
      msg: 'DB Error'
    });

    return res.json({
      bookStore
    })
  });

})

// delete book

router.post('/delete', (req, res) => {
  Book.deleteOne({
    id: req.body.id
  }, (err, bookStore) => {
    if (err) res.json({
      success: false,
      msg: 'DB error'
    });
    return res.json({
      bookStore
    })
  })
})



module.exports = router;