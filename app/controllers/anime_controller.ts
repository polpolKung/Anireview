import Anime from '#models/anime'
import { createAnimeValidator } from '#validators/anime';
import { Application } from '@adonisjs/core/app';
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon';
import path from 'path';

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

    async store({session, request, response}: HttpContext) {
        
        const payload = await request.validateUsing(createAnimeValidator)

        const newAnime = new Anime() 
        newAnime.nameEN = payload.nameEN
        newAnime.nameTH = payload.nameTH
        newAnime.scoreAdmin = payload.score
        newAnime.publishDate = payload.publishDate
        newAnime.urlTrailer = payload.urlTrailer
        newAnime.reviewNoSpoiler = payload.reviewNoSpoiler
        newAnime.reviewSpoiler = payload.reviewSpoiler
        newAnime.description = payload.description
        
        const picture = request.file('picture', {
            extnames: ['jpg', 'jpeg', 'png'],
        })

        if (picture) {
            const fileName = `${Date.now()}-${picture.fileName}`
            const publicDir = path.join(__dirname, '..', '..', 'public', 'images', 'poster')

            await picture.move(publicDir, {
                name: fileName,
                overwrite: true,
            })
    
            newAnime.picturePath = `/images/poster/${fileName}`
        }


        await newAnime.save()
        
        session.flash("message", {type: "positive", message: "เพิ่มอนิเมะใหม่สำเร็จ"})
        response.redirect().toRoute('anime.home')


    }
}