import UsersController from '#controllers/users_controller';
import User from '#models/user'
import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router'

router.on('/login').render('login').as('login')
router.post('/login', [UsersController, 'login']).as('users.login').use(middleware.guest())
router.get('/logout', [UsersController, 'logout']).as('users.logout')

router.on('/register').render('register').as('register')
router.post('/register', [UsersController, 'register']).as('users.register')
router.post('/users/verify', [UsersController, 'verifyUsername']).as('users.verify')


router.get('/create_user',async ()=>{
    const user = await User.create({username: "user1", password: "user1"})
    console.log(user.username + "is created!");
})

