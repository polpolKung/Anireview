import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
import { middleware } from '#start/kernel'
import AnimeController from '#controllers/anime_controller'

router.get('/', ({response}: HttpContext) => {
    response.redirect().toRoute('anime.home')
})

router.get('/anime', [AnimeController,'index']).as('anime.home')