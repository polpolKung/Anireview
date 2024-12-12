import vine from '@vinejs/vine'

const schema = vine.object({
    nameEN: vine.string(),
    nameTH: vine.string(),
    score: vine.number().max(10),
    picture: vine.file({extnames: ['jpg', 'jpeg', 'png']}),
    publishDate: vine.string(),
    urlTrailer: vine.string(),
    reviewNoSpoiler: vine.string(),
    reviewSpoiler: vine.string(),
    description: vine.string(),
})

export const createAnimeValidator = vine.compile(schema)