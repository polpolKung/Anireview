import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    
    async login({auth, request, response}:HttpContext){
        const username = request.input('username')
        const password = request.input('password')

        const user = await User.verifyCredentials(username, password)

        await auth.use('web').login(user)

        response.redirect().toRoute('anime.home')
    }
}