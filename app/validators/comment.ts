import vine from '@vinejs/vine'

const schema = vine.object({
    comment: vine.string(),
    score: vine.number().optional(),
})

export const createCommentValidator = vine.compile(schema)