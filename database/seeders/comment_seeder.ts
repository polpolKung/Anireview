import Comment from '#models/comment'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Comment.createMany([
      {
        animeId: 1,
        userId: 1,
        comment: 'สุดยอดมากครับ เนื้อเรื่องเข้มข้นมาก!',
        score: 9.5,
      },
      {
        animeId: 1,
        userId: 2,
        comment: 'ตัวละครน่ารักมาก ชอบ Rem เป็นพิเศษ!',
        score: 10,
      },
      {
        animeId: 2,
        userId: 3,
        comment: 'เรื่องนี้มีความตึงเครียด แต่ก็สนุก!',
        score: 8.7,
      },
      {
        animeId: 2,
        userId: 4,
        comment: 'พล็อตเรื่องดี แต่บางตอนรู้สึกว่าเดินเรื่องช้าไปหน่อย',
        score: 7.8,
      },
      {
        animeId: 2,
        userId: 5,
        comment: 'ดูแล้วต้องร้องไห้ตามพระเอก อินมากครับ!',
        score: 9.0,
      },
      {
        animeId: 3,
        userId: 6,
        comment: 'การออกแบบตัวละครและฉากสวยมาก เป็นเรื่องที่แนะนำเลยครับ',
        score: 9.3,
      },
      {
        animeId: 3,
        userId: 7,
        comment: 'เรื่องนี้อบอุ่นหัวใจมาก ดูแล้วอมยิ้มตลอด!',
        score: 9.0,
      },
      {
        animeId: 3,
        userId: 8,
        comment: 'ตัวละครมีมิติ ชอบความสัมพันธ์ของฮอริกับมิยามูระมาก!',
        score: 9.5,
      }
    ]);
  }
}