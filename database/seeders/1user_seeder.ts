import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../contract/role.js'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      { username: 'admin', password: 'admin', fullName: 'admin',role: Role.ADMIN },
      { username: 'james', password: '123456789', fullName: 'James Smith', role: Role.USER },
      { username: 'mary', password: '123456789', fullName: 'Mary Johnson', role: Role.USER },
      { username: 'robert', password: '123456789', fullName: 'Robert Brown', role: Role.USER },
      { username: 'linda', password: '123456789', fullName: 'Linda Davis', role: Role.USER },
      { username: 'michael', password: '123456789', fullName: 'Michael Wilson', role: Role.USER }
    ]) 
  }
}