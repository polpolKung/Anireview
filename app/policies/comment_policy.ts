import User from '#models/user'
import Comment from '#models/comment'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './admin_base_policy.js'

export default class CommentPolicy extends AdminBasePolicy {
  
  edit(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.userId
  }
  
  update(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.userId
  }
  
  delete(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.userId
  }
  
}