import vine from '@vinejs/vine'

const schema = vine.object({
    username: vine.string().minLength(4).unique(async (db, value) => {
        const user = await db
          .from('users')
          .where('username', value)
          .first()
        return !user
    }),
    fullname: vine.string(),
    password: vine.string().minLength(8),
    password_confirmation: vine.string().minLength(8).confirmed({ confirmationField: 'password' }),
})


export const registerUserValidator = vine.compile(schema)