create database anireview;
CREATE USER 'admin'@'%' IDENTIFIED BY '17141215';
GRANT ALL PRIVILEGES ON anireview.* TO 'admin'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'admin'@'%';

use anireview;
SELECT * FROM anireview.anime;
SELECT * FROM anireview.users;
SELECT * FROM anireview.comments;

ALTER TABLE anireview.anime
DROP COLUMN score_user;

DROP table anime;


update anime
set description = 'yoooo', url_trailer = 'https://www.youtube.com/embed/Slz_rahWp6Y';


INSERT INTO anime (
    name_en,
    name_th,
    review_no_spoiler, 
    review_spoiler, 
    score_admin, 
    score_user, 
    picture_path, 
    publish_date, 
    created_at, 
    updated_at
) 
VALUES (
    'Re:Zero kara Hajimeru Isekai Seikatsu Season 1111111111111', 
    'รีเซทชีวิต ฝ่าวิกฤตต่างโลก',
    'เป็นอนิเมะแนวต่างโลก(แนวต่างโลกก็คือการที่เกิดเหตุการณ์บางอย่างกับตัวเอกทำให้ต้องไปใช้ชีวิตในอีกโลกนึงที่ไม่ใช่โลกมนุษย์ปกติ)ที่เน้นเรื่องของการเล่นกับเวลาและความตาย เป็นอนิเมะเรื่องนึงที่สนุกมากๆ เนื้อเรื่องมีความเข้มข้น พาเราอินไปกับบรรยากาศที่พาไป แต่ถึงเนื้อเรื่องมีความเข้มข้นแต่ก็ยังมีความฮาของตัวพระเอกที่แทรกเข้ามาเพื่อให้บรรยากาศผ่อนคลาย เรื่องของงานภาพถือว่าทำได้สวยเลยทีเดียว ตัวละครแต่ละตัวมีเอกลักษณ์ ไม่ดูถือว่าพลาดด สำหรับคนที่ไม่ค่อยได้ดูการ์ตูนหรืออนิเมะเรื่องนี้บางคนอาจจะเข้าไม่ถึง แต่ก็ยังขอแนะนำอยู่ดี ถ้าคุณดูแล้วสนุกก็แสดงว่าคุณเข้าถึงมันแล้วล่ะ เรื่องนี้คิดว่าไม่เหมาะสำหรับเด็กๆมากนัก เพราะมีเรื่องของฉากที่มีความรุนแรงอยู่บ้าง แต่ถ้าเป็นช่วงวัยรุ่นก็ถือว่าผ่าน อย่างนี้ต้องไปดูแล้วล่ะ~~~~~', 
    'สำหรับคนที่อยากอ่านรีวิวแบบมีสปอย เรื่องนี้เป็นอนิเมะแนวต่างโลก พระเอกจะมีพลังที่ได้จากแม่มดตนหนึ่งเป็นพลังที่ดูโกงมากนั่นคือพลังที่ถ้าตายแล้วจะย้อนเวลากลับไปยังอดีต สรุปคือถ้าตายจะไม่ตายนั่นเอง ตัวพระเอกนั้นไม่ค่อยจะเก่ง พลังที่ได้มาใช่ว่าจะดีสะทีเดียว เพราะว่าเวลาตายก่อนจะย้อนกลับไปในอดีต ก็ต้องรับรู้กับความเจ็บปวดก่อนตาย แถมถ้าบอกเรื่องพลังกับใครแม่มดจะบีบหัวใจจนตายแล้วค่อยย้อนกลับไปในอดีตใหม่ อนิเมะเรื่องนี้จึงสนุกมากเพราะมีการเล่นกับความรู้สึกของพระเอก การแก้ไขสถานการณ์ต่างๆที่ต้องใช้ความตายในการแก้ปัญหา บางปัญหาก็แก้ไม่ได้ บางปัญหาก็แก้ได้ ต้องลุ้นไปกับเนื้อเรื่องที่นำเสนออกมา แต่ก็ไม่ได้ตึงเครียดทั้งเรื่องมีทั้งตอนที่ผ่อนคลายเช่นกัน เช่นฉากที่พระเอกไล่จีบนางเอก ก็มีโมเม้นแบบนี้ด้วยเหมือนกันในเรื่องนี้ บอกเลยว่าตัวละครผู้หญิงในเรื่องนี้น่ารักมาก อย่างนี้ต้องไปดูแล้วล่ะ~~~~~', 
    9.7, 
    0, 
    '/images/poster/rezero.png', 
    '2024-12-31 00:00:00', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);


INSERT INTO users (
    full_name,
    username,
    password, 
    role,
    created_at, 
    updated_at
) 
VALUES (
    'Chanpol Thippawan', 
    'polpolKung',
    '17141215',
    'USER', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

INSERT INTO comments (
    anime_id,
    user_id,
    comment, 
    score,
    created_at, 
    updated_at
) 
VALUES (
    1, 
    1,
    'สนุกมากครับ',
    9.8, 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);