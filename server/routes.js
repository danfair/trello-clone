const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const { catchErrors } = require('./errorHandlers');
const models = require('./models');

const authController = require('./controllers/authController');

// controllers 
// const storeController = require('../controllers/storeController');
// const userController = require('../controllers/userController');
// const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const app = express();

// router.get('/', (req, res) => {
//   res.json({
//     hi: 'hi'
//   })
// });

router.get('/users', (req, res) => {
  models.User.findAll().then((users) => {
    res.json(users);
  });
});

router.get('/boards', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.user.getBoards()
    .then((boards) => res.json(boards))
})

router.get('/board/:boardId', passport.authenticate('jwt', { session: false }), (req, res) => {
  // models.group.findAll({
  //   include: [ models.user ]
  // }).then((groups) => {
  //   res.json(groups);
  // });
  models.Board.findByPrimary(req.params.boardId, {
    include: [{
      model: models.User,
      attributes: ['id', 'username'],
    }]
  })
    .then((board) => {
      res.json(board);
    })

  
})

router.post('/createBoard', passport.authenticate('jwt', { session: false }), (req, res) => {
  models.Board.create({
    name: req.body.boardTitle,
    userId: req.user.id,
  })
    .then((board) => {
      req.user.addBoard(board, { through: 'BoardUser' })
        .then((boardArray) => {
          res.json(boardArray[0][0]);
        })
    })
})

router.get('/board/:boardId/lists', passport.authenticate('jwt', { session: false }), (req, res) => {
  models.Board.findByPrimary(req.params.boardId, {
    include: [{
      model: models.User,
      attributes: ['id', 'username'],
    }]
  })
    .then(board => {
      console.log('board.Users', board.Users);
      console.log('req.user.id', req.user.id);
      if (board.Users.some(user => user['id'] == req.user.id)) {
        board.getLists()
          .then((lists) => res.json(lists))
      } else {
        res.json({
          error: true,
          message: 'Not authorized to view this'
        })
      }
      
    })
});

router.post('/createList', passport.authenticate('jwt', { session: false }), (req, res) => {
  models.Board.findByPrimary(req.body.boardId, {
    include: [{
      model: models.User,
      attributes: ['id', 'username'],
    }]
  })
    .then((board) => {
      models.List.create({
        title: req.body.listTitle,
        BoardId: req.body.boardId,
      })
        .then((list) => {
          board.addList(list)
            .then
        })
    })

  
})

router.post('/register', authController.register);

router.post('/login', authController.login);

// router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({
//     isAuthenticated: true,
//     user: req.user,
//   })
// });

// router.post('/login', (req, res) => {
//   console.log('received', req.body);
//   res.json(req.body);
  
// })

// router.get('/', catchErrors(storeController.getStores));
// router.get('/stores', catchErrors(storeController.getStores));
// router.get('/stores/page/:page', catchErrors(storeController.getStores));
// router.get('/add', authController.isLoggedIn, storeController.addStore);

// router.post('/add',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.createStore)
// );

// router.post('/add/:id',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.updateStore)
// );

// router.get('/stores/:id/edit', catchErrors(storeController.editStore));
// router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

// router.get('/tags', catchErrors(storeController.getStoresByTag));
// router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

// router.get('/login', userController.loginForm);
// router.post('/login', authController.login);
// router.get('/register', userController.registerForm);

// // 1. Validate the registration data
// // 2. register the user
// // 3. we need to log them in
// router.post('/register',
//   userController.validateRegister,
//   userController.register,
//   authController.login
// );

// router.get('/logout', authController.logout);

// router.get('/account', authController.isLoggedIn, userController.account);
// router.post('/account', catchErrors(userController.updateAccount));
// router.post('/account/forgot', catchErrors(authController.forgot));
// router.get('/account/reset/:token', catchErrors(authController.reset));
// router.post('/account/reset/:token',
//   authController.confirmedPasswords,
//   catchErrors(authController.update)
// );
// router.get('/map', storeController.mapPage);
// router.get('/hearts', authController.isLoggedIn, catchErrors(storeController.getHearts));
// router.post('/reviews/:id',
//   authController.isLoggedIn,
//   catchErrors(reviewController.addReview)
// );

// router.get('/top', catchErrors(storeController.getTopStores));

// /*
//   API
// */

// router.get('/api/search', catchErrors(storeController.searchStores));
// router.get('/api/stores/near', catchErrors(storeController.mapStores));
// router.post('/api/stores/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;