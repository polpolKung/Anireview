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

    async edit({params, view}: HttpContext) {
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
        // await bouncer.with('PostPolicy').authorize('edit',post!)
        return view.render('anime_detail', {anime, comment})
    }

    async update({params, request, response}: HttpContext) {      
        console.log('update');
        
        const animeId = params.aid
        const commentId = params.cid        

        // await bouncer.with('PostPolicy').authorize('update',post!)

        const payload = await request.validateUsing(createCommentValidator)
        const comment = await Comment.find(commentId)
        comment!.comment = payload.comment
        comment!.score = payload.score || null

        await comment?.save()
        await this.updateAnimeScore(animeId)
    
        response.redirect().toRoute('anime.show',[animeId])
    }

    async destroy({params, response}: HttpContext) {
        const animeId = params.aid
        const commentId = params.cid        
        const comment = await Comment.find(commentId)
                                
        // await bouncer.with('PostPolicy').authorize('delete',post!)

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

        console.log('count',count);
        
        anime.scoreUser = count?.$extras?.avg || null;
        await anime.save();
    }

}