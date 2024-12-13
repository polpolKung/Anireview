import vine from '@vinejs/vine'

function createAnimeSchema(isCreate = true) {
    return vine.object({
        nameEN: vine.string(),
        nameTH: vine.string(),
        score: vine.number().max(10),
        picture: isCreate 
            ? vine.file({ extnames: ['jpg', 'jpeg', 'png'] })
            : vine.file({ extnames: ['jpg', 'jpeg', 'png'] }).optional(),
        publishDate: vine.string(),
        urlTrailer: vine.string(),
        reviewNoSpoiler: vine.string(),
        reviewSpoiler: vine.string(),
        description: vine.string(),
    })
}

export const createAnimeValidator = (isCreate: boolean) => vine.compile(createAnimeSchema(isCreate))
