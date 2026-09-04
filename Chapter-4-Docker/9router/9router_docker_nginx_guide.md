# ขั้นตอนการติดตั้ง 9Router บน Docker ออกเน็ตผ่าน Nginx (Reverse Proxy)

คู่มือนี้แนะนำขั้นตอนการติดตั้งและตั้งค่า **9Router** บน Docker Container โดยมี **Nginx** ทำหน้าที่เป็น Reverse Proxy สำหรับจัดการ Traffic และกระจายสัญญาณออกสู่อินเทอร์เน็ต

---

## 📁 1. เตรียมโครงสร้างไดเรกทอรี (Directory Structure)

เริ่มต้นด้วยการสร้างโฟลเดอร์สำหรับเก็บไฟล์คอนฟิกและซอร์สโค้ดของโครงการ

```bash
mkdir -p 9router-docker/nginx
cd 9router-docker
```

---

## ⚙️ 2. สร้างไฟล์ Nginx Configuration (`nginx/default.conf`)

สร้างไฟล์ `default.conf` ภายในไดเรกทอรี `nginx/` เพื่อตั้งค่า Nginx ให้รับ Traffic ที่พอร์ต 80 และส่งต่อ (Proxy Pass) ไปยัง 9Router Container

```nginx
server {
    listen 80;
    server_name your-domain.com; # เปลี่ยนเป็น Domain Name หรือ IP Address ของคุณ

    # ส่งต่อ Request ทั้งหมดไปยัง 9Router Service
    location / {
        proxy_pass http://9router-app:3000;
        proxy_http_version 1.1;
        
        # รองรับ WebSockets และ Connection Upgrades
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        
        # ส่งค่า Headers ที่จำเป็นเพื่อระบุ Client Real IP
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🐳 3. สร้างไฟล์ Docker Compose (`docker-compose.yml`)

สร้างไฟล์ `docker-compose.yml` บริเวณ Root Directory ของโครงการ เพื่อรัน 9Router และ Nginx ให้อยู่บน Network เดียวกัน

```yaml
version: '3.8'

services:
  # 9Router Application Service
  9router-app:
    image: 9router/9router:latest # เปลี่ยนเป็น Image หรือ Build Path ของ 9Router
    container_name: 9router-app
    restart: always
    environment:
      - NODE_ENV=production
      - PORT=3000
    networks:
      - 9router-net

  # Nginx Reverse Proxy Service
  nginx:
    image: nginx:alpine
    container_name: 9router-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - 9router-app
    networks:
      - 9router-net

networks:
  9router-net:
    driver: bridge
```

---

## 🚀 4. สั่งรัน Docker Containers

รันคำสั่งด้านล่างเพื่อดาวน์โหลด Image และสั่งประมวลผล Container ใน Background Mode:

```bash
docker compose up -d
```

---

## 🔍 5. การตรวจสอบสถานะและการทำงาน (Verification)

1. **ตรวจสอบสถานะของ Container:**
   ```bash
   docker compose ps
   ```

2. **ดู Logs การทำงานของบริการ:**
   ```bash
   # ดู Logs ทั้งหมด
   docker compose logs -f

   # ดูเฉพาะ Logs ของ Nginx
   docker compose logs -f nginx
   ```

3. **ทดสอบการเข้าใช้งาน:**
   เปิดเว็บเบราว์เซอร์แล้วระบุ `http://your-domain.com` หรือ IP Address ของ Server ที่ตั้งค่าไว้

---

## 🔒 ข้อแนะนำเพิ่มเติม: การตั้งค่า SSL (HTTPS) ด้วย Let's Encrypt

หากต้องการเปิดใช้งาน HTTPS แนะนำให้ติดตั้ง **Certbot** บน Nginx หรือใช้ **Nginx Proxy Manager** เพื่อจัดการ SSL Certificate โดยอัตโนมัติ
