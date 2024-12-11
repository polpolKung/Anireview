import Anime from '#models/anime'
import type { HttpContext } from '@adonisjs/core/http'

export default class AnimeController {
    async index({view}: HttpContext) {
        
        const animeList = await Anime.query();
        const maxLength = 500;
        animeList.forEach(anime => {
            if (anime.reviewNoSpoiler.length > maxLength) {
                anime.reviewNoSpoiler = anime.reviewNoSpoiler.substring(0, maxLength) + '...';
            }
        });

        return view.render('anime_list', {animeList})
    }

    async show({view, params}: HttpContext) {
        const id = params.id
        const anime = await Anime.query()
                                    .where('id', id)
                                    .preload('comments', (commentQuery) => {
                                    commentQuery.preload('user', (userQuery) => {
                                        userQuery.select('fullName');
                                    });
                                    })
                                    .first();

        
        return view.render('anime_detail', {anime})
    }

    async create({view}: HttpContext) {       
        return view.render('anime_form')
    }
}