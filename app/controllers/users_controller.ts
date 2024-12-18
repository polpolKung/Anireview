import User from '#models/user'
import { registerUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    
    async login({auth, request, response, session}:HttpContext){
        const username = request.input('username')
        const password = request.input('password')
        try {
            const user = await User.verifyCredentials(username, password);
            await auth.use('web').login(user);
            response.redirect().toRoute('anime.home');
        } catch (error) {
            session.flash("message",{type: "negative", message:"Username หรือ Password ไม่ถูกต้อง"})
            response.redirect().back();
        }

    }

    async logout({auth, response}:HttpContext){
        await auth.use('web').logout()

        response.redirect().toRoute('users.login')
    }

    async register({request, response, session}:HttpContext){
        const payload = await request.validateUsing(registerUserValidator)

        const newUser = new User()
        newUser.username = payload.username
        newUser.fullName = payload.fullname
        newUser.password = payload.password

        await newUser.save()
        session.flash("message",{type: "positive", message:"ลงทะเบียนสำเร็จ กรุณา login เพื่อเข้าสู่ระบบ"})

        response.redirect().toRoute('login')
    }
}