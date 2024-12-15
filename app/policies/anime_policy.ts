import User from '#models/user'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './admin_base_policy.js'
import Role from '../../contract/role.js'

export default class AnimePolicy extends AdminBasePolicy {

  
  viewList(user: User): AuthorizerResponse {
    return user?.role == Role.ADMIN
  }
  
  view(user: User): AuthorizerResponse {
    return user?.role == Role.ADMIN
  }
  
  create(user: User): AuthorizerResponse {
    return user?.role == Role.ADMIN
  }
  
  edit(user: User): AuthorizerResponse {
    return user?.role == Role.ADMIN
  }
  
  update(user: User): AuthorizerResponse {
    return user?.role == Role.ADMIN
  }
  
  delete(user: User): AuthorizerResponse {
    return user?.role == Role.ADMIN
  }
  
}