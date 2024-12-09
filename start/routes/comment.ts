import router from '@adonisjs/core/services/router'
import CommentsController from '#controllers/comments_controller'
import { middleware } from '#start/kernel'


router.group(()=> {
    router.get('comments/:postid', [CommentsController, 'index']).as('comments.index')
    router.post('comments/:postid', [CommentsController, 'store']).as('comments.store')
}).use(middleware.auth())

