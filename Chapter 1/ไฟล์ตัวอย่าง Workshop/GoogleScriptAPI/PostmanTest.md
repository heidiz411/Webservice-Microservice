การทดสอบใน Postman (ปรับเปลี่ยน JSON Body)
หลังจาก Deploy เวอร์ชั่นใหม่แล้ว คุณสามารถกลับไปทดสอบใน Postman ได้ โดยปรับเปลี่ยน JSON Body ให้ใช้ title และ author แทน name และ description

1. ทดสอบ CREATE Item (POST Request)
Method: POST
URL: Web app URL ของคุณ
Headers: Content-Type: application/json
Body: (raw, JSON)
JSON

{
    "action": "create",
    "data": {
        "title": "My New Book Title",
        "author": "Jane Doe"
    }
}
2. ทดสอบ UPDATE Item (POST Request)
Method: POST
URL: Web app URL ของคุณ
Headers: Content-Type: application/json
Body: (raw, JSON)
JSON

{
    "action": "update",
    "data": {
        "id": "YOUR_ITEM_ID",
        "title": "Updated Book Title",
        "author": "John Smith"
    }
}
(แทนที่ YOUR_ITEM_ID ด้วย ID ที่คุณต้องการอัปเดต)
3. ทดสอบ DELETE Item (DELETE Request)
Method: DELETE
URL: Web app URL ของคุณ
Headers: Content-Type: application/json
Body: (raw, JSON)
JSON

{
    "action": "delete",
    "data": {
        "id": "YOUR_ITEM_ID"
    }
}
4. ทดสอบ READ All / Specific Item (GET Request)
Method: GET
URL: Web app URL ของคุณ
สำหรับทั้งหมด: https://script.google.com/macros/s/AKfyc.../exec
สำหรับเฉพาะเจาะจง: https://script.google.com/macros/s/AKfyc.../exec?id=YOUR_ITEM_ID
ผลลัพธ์ที่ได้จะเป็น JSON ที่มีโครงสร้างเป็น id, title, author แทน id, name, description ครับ
