import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import Role from '../../contract/role.js'

export default class AdminBasePolicy extends BasePolicy {
    async before(user: User | null) { 
      if(user?.role == Role.ADMIN){ 
        return true
      } 
    } 
}