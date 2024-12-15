import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../contract/role.js'

export default class extends BaseSeeder {
  async run() {
    await User.create({username: 'admin', password: 'admin', fullName: 'admin',role: Role.ADMIN}) 
  }
}