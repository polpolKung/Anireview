import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
import { middleware } from '#start/kernel'
import AnimeController from '#controllers/anime_controller'

router.get('/', ({response}: HttpContext) => {
    response.redirect().toRoute('anime.home')
})

router.group(()=> {
    router.get('/anime/create', [AnimeController,'create']).as('anime.create')
    router.post('/anime/create', [AnimeController,'store']).as('anime.store')
    router.get('/anime/edit/:id', [AnimeController,'edit']).as('anime.edit')
    router.post('/anime/update/:id', [AnimeController,'update']).as('anime.update')
    router.get('/anime/delete/:id', [AnimeController,'destroy']).as('anime.delete')

}).use(middleware.auth())

router.group(()=> {
    router.get('/anime', [AnimeController,'index']).as('anime.home')
    router.get('/anime/:id', [AnimeController,'show']).as('anime.show')
}).use(middleware.authguest())


