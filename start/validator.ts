import vine, { SimpleMessagesProvider }from '@vinejs/vine'


vine.messagesProvider = new SimpleMessagesProvider({
    'required': 'กรุณากรอก {{ field }}',
    'minLength': '{{ field }} ต้องใส่อย่างน้อย {{ min }} ตัวอักษร.',
    'confirmed': 'password ไม่ตรงกัน',
    'database.unique': 'มี username นี้อยู่แล้ว',
})