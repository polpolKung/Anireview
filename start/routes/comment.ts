import router from '@adonisjs/core/services/router'
import CommentsController from '#controllers/comments_controller'
import { middleware } from '#start/kernel'

router.group(()=> {
    router.post('/comments/:uid/create/:aid', [CommentsController, 'store']).as('comments.create')
    router.get('/comments/:aid/edit/:cid', [CommentsController, 'edit']).as('comments.edit')
    router.post('/comments/:aid/update/:cid', [CommentsController, 'update']).as('comments.update')
    router.get('/comments/:aid/delete/:cid', [CommentsController, 'destroy']).as('comments.delete')

}).use(middleware.auth())
