import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
import { middleware } from '#start/kernel'
import AnimeController from '#controllers/anime_controller'

router.get('/', ({response}: HttpContext) => {
    response.redirect().toRoute('anime.home')
})

router.group(()=> {
    router.get('/anime/form', [AnimeController,'create']).as('anime.create')
    router.post('/anime/form', [AnimeController,'store']).as('anime.store')
}).use(middleware.auth())

router.group(()=> {
    router.get('/anime', [AnimeController,'index']).as('anime.home')
    router.get('/anime/:id', [AnimeController,'show']).as('anime.show')
}).use(middleware.authguest())


