import UsersController from '#controllers/users_controller';
import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router'

router.on('/login').render('login').as('login').use(middleware.guest())
router.post('/login', [UsersController, 'login']).as('users.login')
router.get('/logout', [UsersController, 'logout']).as('users.logout')

router.on('/register').render('register').as('register')
router.post('/register', [UsersController, 'register']).as('users.register')
