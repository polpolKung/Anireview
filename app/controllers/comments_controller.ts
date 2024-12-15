import Anime from '#models/anime'
import Comment from '#models/comment'
import { createCommentValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
    async store({request, response, params}: HttpContext) {
        const payload = await request.validateUsing(createCommentValidator)
        const animeId = params.aid
        const userId = params.uid
        const newCommnet = new Comment() 
        newCommnet.animeId = animeId
        newCommnet.userId = userId
        newCommnet.comment = payload.comment
        newCommnet.score = payload.score || null

        await newCommnet.save();
        await this.updateAnimeScore(animeId)
        
        response.redirect().toRoute('anime.show',[animeId])
    }

    async edit({params, view, bouncer}: HttpContext) {
        const animeId = params.aid
        const commentId = params.cid
        const comment = await Comment.find(commentId)
        const anime = await Anime.query()
                                    .where('id', animeId)
                                    .preload('comments', (commentQuery) => {
                                        commentQuery.preload('user', (userQuery) => {
                                            userQuery.select('fullName');
                                        });
                                    })
                                    .first();

        await bouncer.with('CommentPolicy').authorize('edit',comment!)
        
        if(anime?.scoreAdmin){
            anime.scoreAdmin = parseFloat(anime.scoreAdmin.toString())
        }
        if(anime?.scoreUser){
            anime.scoreUser = parseFloat(anime.scoreUser.toString())
        }
        return view.render('anime_detail', {anime, comment})
    }

    async update({params, request, response, bouncer}: HttpContext) {      
        console.log('update');
        
        const animeId = params.aid
        const commentId = params.cid        

        const payload = await request.validateUsing(createCommentValidator)
        const comment = await Comment.find(commentId)
        comment!.comment = payload.comment
        comment!.score = payload.score || null

        await bouncer.with('CommentPolicy').authorize('update',comment!)

        await comment?.save()
        await this.updateAnimeScore(animeId)
    
        response.redirect().toRoute('anime.show',[animeId])
    }

    async destroy({params, response, bouncer}: HttpContext) {
        const animeId = params.aid
        const commentId = params.cid        
        const comment = await Comment.find(commentId)
                                
        await bouncer.with('CommentPolicy').authorize('delete',comment!)

        await comment?.delete()
        await this.updateAnimeScore(animeId)

        response.redirect().toRoute('anime.show',[animeId])
    }

    async updateAnimeScore(animeId: number): Promise<void> {
        const anime = await Anime.findOrFail(animeId);
    
        const count = await Comment.query()
            .where('animeId', animeId)
            .andWhereNotNull('score')
            .avg('score as avg')
            .first();
        
        anime.scoreUser = count?.$extras?.avg || null;
        await anime.save();
    }

}