import Anime from '#models/anime'
import { createAnimeValidator } from '#validators/anime';
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon';
import path from 'path';
import fs from 'fs/promises';


export default class AnimeController {
    async index({view}: HttpContext) {
        
        const animeList = await Anime.query().orderBy('publish_date','desc');
        const maxLength = 500;
        animeList.forEach(anime => {
            if (anime.reviewNoSpoiler.length > maxLength) {
                anime.reviewNoSpoiler = anime.reviewNoSpoiler.substring(0, maxLength) + '...';
            }
            if(anime?.scoreAdmin){
                anime.scoreAdmin = parseFloat(anime.scoreAdmin.toString())
            }
            if(anime?.scoreUser){
                anime.scoreUser = parseFloat(anime.scoreUser.toString())
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
        if(anime?.scoreAdmin){
            anime.scoreAdmin = parseFloat(anime.scoreAdmin.toString())
        }
        if(anime?.scoreUser){
            anime.scoreUser = parseFloat(anime.scoreUser.toString())
        }
        
        return view.render('anime_detail', {anime})
    }

    async create({view}: HttpContext) {       
        return view.render('anime_form')
    }

    async store({session, request, response}: HttpContext) {
        
        const payload = await request.validateUsing(createAnimeValidator(true))

        const newAnime = new Anime() 
        newAnime.nameEN = payload.nameEN
        newAnime.nameTH = payload.nameTH
        newAnime.scoreAdmin = payload.score
        newAnime.publishDate =  DateTime.fromISO(payload.publishDate)
        newAnime.urlTrailer = this.convertYouTubeLinkToEmbed(payload.urlTrailer)
        newAnime.reviewNoSpoiler = payload.reviewNoSpoiler
        newAnime.reviewSpoiler = payload.reviewSpoiler
        newAnime.description = payload.description
        
        const picture = request.file('picture', {
            extnames: ['jpg', 'jpeg', 'png'],
        })



        if (picture) {
            const dir = process.cwd()
            const publicDir = path.join(dir, 'public', 'images', 'poster')

            const fileName = `${Date.now()}-${picture.clientName}.png`

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

    async edit({params, view}: HttpContext) {
        const id = params.id
        const anime = await Anime.find(id)

        // await bouncer.with('PostPolicy').authorize('edit',post!)
        return view.render('anime_form', {anime})
    }

    async update({params, request, response, session}: HttpContext) {      
        const id = params.id
        const anime = await Anime.find(id)


        // await bouncer.with('PostPolicy').authorize('update',post!)

        const payload = await request.validateUsing(createAnimeValidator(false))
        anime!.nameEN = payload.nameEN
        anime!.nameTH = payload.nameTH
        anime!.scoreAdmin = payload.score
        anime!.publishDate =  DateTime.fromISO(payload.publishDate)
        anime!.urlTrailer = this.convertYouTubeLinkToEmbed(payload.urlTrailer)
        anime!.reviewNoSpoiler = payload.reviewNoSpoiler
        anime!.reviewSpoiler = payload.reviewSpoiler
        anime!.description = payload.description
        
        const picture = request.file('picture', {
            extnames: ['jpg', 'jpeg', 'png'],
        })

        if (picture) {
            const dir = process.cwd();
            const publicDir = path.join(dir, 'public', 'images', 'poster');
        
            if (anime!.picturePath) {
                const oldFilePath = path.join(dir, 'public', anime!.picturePath);
                try {
                    await fs.access(oldFilePath);
                    await fs.unlink(oldFilePath);
                } catch (error) {
                    console.log(error);
                }
            }
        
            const fileName = `${Date.now()}-${picture.clientName}`;

            await picture.move(publicDir, {
                name: fileName,
                overwrite: true,
            });
        
            anime!.picturePath = `/images/poster/${fileName}`;
        }

        await anime?.save()
        
        session.flash("message", {type: "positive", message: "อัพเดทข้อมูลสำเร็จ"})
        response.redirect().toRoute('anime.show',[id])
    }

    async destroy({params, response, session}: HttpContext) {
        const id = params.id
        const anime = await Anime.find(id)   
                                
        // await bouncer.with('PostPolicy').authorize('delete',post!)

        await anime?.delete()
        session.flash("message", {type: "positive", message: "ลบข้อมูลสำเร็จ"})

        response.redirect().toRoute('anime.home')
    }

    convertYouTubeLinkToEmbed(url: string): string {
        const youtubeRegexes = [
            /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/,               
            /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
            /https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
            /https:\/\/www\.youtube\.com\/v\/([a-zA-Z0-9_-]+)/ 
        ];
        
        for (const regex of youtubeRegexes) {
            const match = url.match(regex);
            if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
            }
        }
        
        return url;
    }

}