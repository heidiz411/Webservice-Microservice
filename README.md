พื้นฐาน Web Service และ Workshop (PHP vs. Next.js)
บทนำ
Repository นี้จัดทำขึ้นเพื่อเป็นสื่อการสอนและเอกสารประกอบการเรียนรู้เกี่ยวกับ Web Service สำหรับนักศึกษาระดับปริญญาตรี โดยแบ่งเนื้อหาออกเป็น 2 ส่วนหลัก:

ภาคทฤษฎี: ความรู้พื้นฐานเกี่ยวกับ Web Service, หลักการทำงาน, ประเภท, ประโยชน์, ข้อจำกัด และแนวคิดพื้นฐานของ RESTful API

ภาคปฏิบัติ (Workshop): การสร้าง Web Service (API) อย่างง่ายด้วย PHP และการสร้าง Client เพื่อเรียกใช้ API นั้นด้วย PHP และ Next.js เพื่อให้นักศึกษาได้เห็นการทำงานจริงและเปรียบเทียบความแตกต่างของเทคโนโลยี

โครงสร้างการสอน (ชั่วโมงที่ 1: ทฤษฎี)
หัวข้อ: ความรู้เบื้องต้นเกี่ยวกับ Web Service และการประยุกต์ใช้งาน
วัตถุประสงค์:

ผู้เรียนสามารถอธิบายความหมายและหลักการทำงานพื้นฐานของ Web Service ได้

ผู้เรียนสามารถระบุประเภทของ Web Service ที่นิยมใช้งานได้

ผู้เรียนสามารถเข้าใจประโยชน์และข้อจำกัดของ Web Service

ผู้เรียนสามารถยกตัวอย่างการประยุกต์ใช้งาน Web Service ในสถานการณ์จริงได้

ผู้เรียนสามารถเข้าใจแนวคิดพื้นฐานของ RESTful API ได้

เนื้อหาโดยย่อ:

บทนำ: ความสำคัญและตัวอย่างการใช้งาน Web Service ในชีวิตประจำวัน

ความหมายและหลักการทำงานพื้นฐาน: นิยาม, องค์ประกอบ (Client, Server, Network, Protocol, Message Format), ขั้นตอนการทำงาน

ประเภทของ Web Service: SOAP (Simple Object Access Protocol) และ REST (Representational State Transfer)

ประโยชน์และข้อจำกัด: การทำงานร่วมกัน, การนำกลับมาใช้ใหม่, ความซับซ้อน, ความปลอดภัย

ตัวอย่างการประยุกต์ใช้งาน: การพยากรณ์อากาศ, ระบบชำระเงิน, Mobile App

แนวคิดพื้นฐานของ RESTful API: Statelessness, Resource-based, HTTP Methods (GET, POST, PUT, DELETE)

สรุปและถาม-ตอบ

โครงสร้าง Workshop (ชั่วโมงที่ 2: ปฏิบัติ)
หัวข้อ: Workshop ปฏิบัติการ Web Service (PHP vs. Next.js)
วัตถุประสงค์:

ผู้เรียนสามารถสร้าง Web Service (API) อย่างง่ายด้วย PHP ได้

ผู้เรียนสามารถเรียกใช้ Web Service ด้วย PHP Client ได้

ผู้เรียนสามารถเรียกใช้ Web Service ด้วย Next.js Client ได้

ผู้เรียนสามารถเปรียบเทียบความแตกต่างและข้อดีข้อเสียของการใช้ PHP และ Next.js ในการสร้างและเรียกใช้ Web Service ได้

กิจกรรม Workshop:

ทบทวนและปูพื้นฐาน: ทบทวน Client-Server, API และวัตถุประสงค์ของ Workshop

Workshop 1: สร้าง Web Service (API) ด้วย PHP:

สร้างไฟล์ api.php เพื่อส่งข้อมูลผู้ใช้จำลองในรูปแบบ JSON

สาธิตการทดสอบ API ผ่าน Browser

Workshop 2: สร้าง Client ด้วย PHP:

สร้างไฟล์ php_client.php เพื่อเรียกใช้ api.php โดยใช้ file_get_contents()

แสดงผลข้อมูลที่ได้รับ

Workshop 3: สร้าง Client ด้วย Next.js:

สร้าง Component ใน Next.js (React) เพื่อเรียกใช้ API โดยใช้ fetch API

แสดงผลข้อมูลบนหน้าเว็บ โดยใช้ React Hooks (useState, useEffect)

เปรียบเทียบและสรุป: อภิปรายความแตกต่างของโค้ดและแนวคิดระหว่าง PHP Client และ Next.js Client รวมถึงข้อดีข้อเสียของแต่ละเทคโนโลยี

สิ่งที่ต้องเตรียม (Prerequisites)
ก่อนเริ่ม Workshop นักศึกษาควรติดตั้งโปรแกรมและเครื่องมือดังต่อไปนี้:

สำหรับ PHP Web Service และ PHP Client:

XAMPP / WAMP Server: (หรือ LAMP สำหรับ Linux) สำหรับจำลอง Web Server (Apache) และ PHP Environment

สำหรับ Next.js Client:

Node.js และ npm (Node Package Manager): สำหรับรัน Next.js Application

การตั้งค่าและรันโปรเจกต์
1. การตั้งค่า PHP Web Service และ PHP Client
ติดตั้ง XAMPP/WAMP: ดาวน์โหลดและติดตั้ง XAMPP (สำหรับ Windows/macOS/Linux) หรือ WAMP Server (สำหรับ Windows)

สร้างโฟลเดอร์โปรเจกต์:

หลังจากติดตั้ง XAMPP ให้ไปที่โฟลเดอร์ htdocs (ปกติจะอยู่ที่ C:\xampp\htdocs\ สำหรับ Windows)

สร้างโฟลเดอร์ใหม่ภายใน htdocs เช่น web_service_workshop

วางไฟล์โค้ด:

คัดลอกโค้ดจากส่วน api.php และ php_client.php ด้านล่าง ไปบันทึกเป็นไฟล์ api.php และ php_client.php ตามลำดับ ภายในโฟลเดอร์ web_service_workshop

รัน Apache Server:

เปิด XAMPP Control Panel (หรือ WAMP Manager)

Start Apache Module

ทดสอบ PHP API:

เปิดเบราว์เซอร์ของคุณ

ไปที่ URL: http://localhost/web_service_workshop/api.php

คุณควรจะเห็นข้อมูล JSON แสดงขึ้นมาในเบราว์เซอร์

ลองทดสอบเรียกข้อมูลเฉพาะ ID: http://localhost/web_service_workshop/api.php?id=1

ทดสอบ PHP Client:

เปิดเบราว์เซอร์ของคุณ

ไปที่ URL: http://localhost/web_service_workshop/php_client.php

คุณควรจะเห็นข้อมูลที่ดึงมาจาก api.php แสดงผลบนหน้าเว็บ

2. การตั้งค่า Next.js Client
ติดตั้ง Node.js: ดาวน์โหลดและติดตั้ง Node.js จาก nodejs.org (npm จะมาพร้อมกับ Node.js)

สร้างโปรเจกต์ Next.js:

เปิด Terminal หรือ Command Prompt

รันคำสั่ง:

npx create-next-app@latest my-nextjs-client --use-npm --example "with-tailwindcss"

ตอบ Yes สำหรับ TypeScript, ESLint, App Router, Import Alias ตามที่ระบบถาม

เข้าสู่โฟลเดอร์โปรเจกต์:

เมื่อสร้างโปรเจกต์เสร็จ ให้เข้าไปในโฟลเดอร์ที่สร้างขึ้น:

cd my-nextjs-client

วางไฟล์โค้ด:

เปิดไฟล์ app/page.js (หรือ src/app/page.js ถ้ามี src folder) ในโปรเจกต์ Next.js ของคุณ

ลบเนื้อหาเดิมทั้งหมด และคัดลอกโค้ดจากส่วน Next.js Client ด้านล่าง ไปวางแทนที่

หมายเหตุสำคัญ: ในโค้ด Next.js ตัวอย่างนี้ใช้ https://jsonplaceholder.typicode.com/users เป็น Mock API เพื่อให้สามารถรันได้ทันทีโดยไม่ต้องพึ่ง PHP Server หากต้องการเชื่อมต่อกับ api.php ที่สร้างไว้จริง ๆ ต้องเปลี่ยนค่า API_URL ในไฟล์ App.js เป็น http://localhost/web_service_workshop/api.php และต้องแน่ใจว่า PHP Server กำลังทำงานอยู่และอนุญาต CORS (ซึ่งได้ตั้งค่า Access-Control-Allow-Origin: * ไว้ใน api.php แล้ว)

รัน Next.js Application:

ใน Terminal หรือ Command Prompt (ขณะที่อยู่ในโฟลเดอร์ my-nextjs-client) รันคำสั่ง:

npm run dev

ทดสอบ Next.js Client:

เปิดเบราว์เซอร์ของคุณ

ไปที่ URL: http://localhost:3000

คุณควรจะเห็นหน้าเว็บที่แสดงข้อมูลผู้ใช้ที่ดึงมาจาก API

ตัวอย่างโค้ด
1. PHP Web Service (api.php)
ไฟล์นี้ทำหน้าที่เป็น API Endpoint ที่ส่งข้อมูลผู้ใช้จำลองกลับไปในรูปแบบ JSON

<?php
// ไฟล์: api.php (ทำหน้าที่เป็น Web Service / API Endpoint)
// อธิบาย: ไฟล์นี้จะส่งข้อมูลผู้ใช้จำลองกลับไปในรูปแบบ JSON

header('Content-Type: application/json'); // กำหนด Header ให้เป็น JSON
header('Access-Control-Allow-Origin: *'); // อนุญาตให้ทุกโดเมนสามารถเรียกใช้ API นี้ได้ (สำคัญสำหรับ CORS)

// ข้อมูลผู้ใช้จำลอง
$users = [
    [
        'id' => 1,
        'name' => 'สมชาย ใจดี',
        'email' => 'somchai@example.com',
        'role' => 'Admin'
    ],
    [
        'id' => 2,
        'name' => 'สมหญิง รักเรียน',
        'email' => 'somying@example.com',
        'role' => 'User'
    ],
    [
        'id' => 3,
        'name' => 'มานะ เก่งมาก',
        'email' => 'mana@example.com',
        'role' => 'Editor'
    ]
];

// ตรวจสอบว่ามีการร้องขอข้อมูลผู้ใช้คนใดคนหนึ่งหรือไม่
if (isset($_GET['id'])) {
    $requestedId = (int)$_GET['id'];
    $foundUser = null;
    foreach ($users as $user) {
        if ($user['id'] === $requestedId) {
            $foundUser = $user;
            break;
        }
    }
    if ($foundUser) {
        echo json_encode(['status' => 'success', 'data' => $foundUser]);
    } else {
        http_response_code(404); // ตั้งค่า HTTP Status Code เป็น 404 Not Found
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
    }
} else {
    // ถ้าไม่มีการระบุ ID ให้ส่งข้อมูลผู้ใช้ทั้งหมด
    echo json_encode(['status' => 'success', 'data' => $users]);
}
?>

2. PHP Client (php_client.php)
ไฟล์นี้ทำหน้าที่เป็น Client PHP ที่เรียกใช้ Web Service ที่สร้างจาก api.php และแสดงผลข้อมูล

<?php
// ไฟล์: php_client.php (ทำหน้าที่เป็น Client PHP)
// อธิบาย: ไฟล์นี้จะเรียกใช้ Web Service ที่สร้างจาก api.php และแสดงผลข้อมูล

// URL ของ Web Service ที่เราสร้างขึ้น (ต้องรัน XAMPP/WAMP และวางไฟล์ api.php ใน htdocs/www)
// สมมติว่าไฟล์ api.php อยู่ที่ http://localhost/web_service_workshop/api.php
$apiUrl = 'http://localhost/web_service_workshop/api.php'; // เปลี่ยน URL ตามที่ตั้งของไฟล์ api.php ของคุณ

echo "<h1>PHP Client: เรียกใช้ Web Service</h1>";
echo "<h2>ข้อมูลผู้ใช้ทั้งหมด:</h2>";

// ใช้ file_get_contents เพื่อเรียกข้อมูลจาก API
// วิธีนี้ง่าย แต่ถ้าต้องการควบคุม Request/Response ได้ละเอียดขึ้น ควรใช้ cURL
$response = @file_get_contents($apiUrl); // @ ใช้เพื่อซ่อน Warning ถ้าเกิดข้อผิดพลาด

if ($response === FALSE) {
    echo "<p style='color: red;'>ไม่สามารถเชื่อมต่อกับ Web Service ได้ กรุณาตรวจสอบ URL และสถานะของ Server</p>";
} else {
    // แปลงข้อมูล JSON ที่ได้รับมาเป็น PHP Array/Object
    $data = json_decode($response, true); // true เพื่อให้ได้เป็น Associative Array

    if (json_last_error() === JSON_ERROR_NONE && isset($data['status']) && $data['status'] === 'success') {
        echo "<pre>";
        print_r($data['data']); // แสดงผลข้อมูลที่ได้รับ
        echo "</pre>";
    } else {
        echo "<p style='color: red;'>เกิดข้อผิดพลาดในการประมวลผลข้อมูลจาก Web Service: " . (isset($data['message']) ? $data['message'] : 'Unknown error') . "</p>";
        echo "<p>Response ดิบ: " . htmlspecialchars($response) . "</p>";
    }
}

echo "<h2>ข้อมูลผู้ใช้ ID 2:</h2>";
$apiUrlWithId = $apiUrl . '?id=2';
$responseWithId = @file_get_contents($apiUrlWithId);

if ($responseWithId === FALSE) {
    echo "<p style='color: red;'>ไม่สามารถเชื่อมต่อกับ Web Service สำหรับ ID 2 ได้</p>";
} else {
    $dataWithId = json_decode($responseWithId, true);
    if (json_last_error() === JSON_ERROR_NONE && isset($dataWithId['status']) && $dataWithId['status'] === 'success') {
        echo "<pre>";
        print_r($dataWithId['data']);
        echo "</pre>";
    } else {
        echo "<p style='color: red;'>เกิดข้อผิดพลาดในการประมวลผลข้อมูลผู้ใช้ ID 2: " . (isset($dataWithId['message']) ? $dataWithId['message'] : 'Unknown error') . "</p>";
    }
}

?>

3. Next.js Client (app/page.js)
ไฟล์นี้ทำหน้าที่เป็น Client ที่สร้างด้วย Next.js (React) เพื่อเรียกใช้ Web Service และแสดงผลข้อมูลบนหน้าเว็บ

import React, { useState, useEffect } from 'react';

// ส่วนประกอบหลักของแอปพลิเคชัน Next.js
// ไฟล์นี้คือ pages/index.js หรือ components/App.js (ถ้าคุณสร้างโครงสร้างเอง)
// ในบริบทของ Canvas จะถือว่านี่คือ App หลัก
export default function App() {
  // สถานะสำหรับเก็บข้อมูลผู้ใช้ที่ดึงมาจาก API
  const [users, setUsers] = useState([]);
  // สถานะสำหรับจัดการสถานะการโหลดข้อมูล
  const [loading, setLoading] = useState(true);
  // สถานะสำหรับเก็บข้อผิดพลาดที่เกิดขึ้น
  const [error, setError] = useState(null);

  // URL ของ Web Service ที่เราจะเรียกใช้
  // ในการสาธิตนี้ เราจะใช้ JSONPlaceholder เป็น Mock API
  // ในสถานการณ์จริง คุณจะเปลี่ยนเป็น URL ของ api.php ที่คุณสร้างไว้ (เช่น 'http://localhost/web_service_workshop/api.php')
  const API_URL = 'https://jsonplaceholder.typicode.com/users'; // Mock API สำหรับสาธิต

  // useEffect Hook จะทำงานเมื่อ Component ถูก Render ครั้งแรก
  // และจะทำงานอีกครั้งเมื่อ Dependency Array (ในที่นี้คือ []) มีการเปลี่ยนแปลง
  useEffect(() => {
    // ฟังก์ชัน asynchronous สำหรับดึงข้อมูลจาก API
    const fetchUsers = async () => {
      try {
        // ตั้งค่าสถานะการโหลดเป็น true ก่อนเริ่มดึงข้อมูล
        setLoading(true);
        setError(null); // ล้างข้อผิดพลาดเก่า

        // ใช้ fetch API ใน JavaScript เพื่อส่ง HTTP Request ไปยัง API_URL
        const response = await fetch(API_URL);

        // ตรวจสอบว่า Response เป็น OK (HTTP Status 200-299) หรือไม่
        if (!response.ok) {
          // ถ้าไม่ OK ให้โยน Error
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // แปลง Response ที่เป็น JSON ให้เป็น JavaScript Object
        const data = await response.json();

        // ตั้งค่าข้อมูลผู้ใช้ที่ได้รับมาในสถานะ
        setUsers(data);
      } catch (e) {
        // ดักจับข้อผิดพลาดที่เกิดขึ้นระหว่างการดึงข้อมูล
        console.error("Error fetching users:", e);
        setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้: " + e.message);
      } finally {
        // ไม่ว่าจะสำเร็จหรือล้มเหลว ให้ตั้งค่าสถานะการโหลดเป็น false
        setLoading(false);
      }
    };

    // เรียกใช้ฟังก์ชัน fetchUsers เมื่อ Component ถูก Render ครั้งแรก
    fetchUsers();
  }, []); // Dependency Array ว่างเปล่า หมายความว่า Effect นี้จะทำงานเพียงครั้งเดียวหลัง Render ครั้งแรก

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Next.js Client
          </span>
          <br />
          <span className="text-2xl text-gray-600">เรียกใช้ Web Service</span>
        </h1>

        {/* แสดงสถานะการโหลด */}
        {loading && (
          <div className="flex items-center justify-center text-blue-500 text-lg">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            กำลังโหลดข้อมูล...
          </div>
        )}

        {/* แสดงข้อผิดพลาด */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">เกิดข้อผิดพลาด!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* แสดงข้อมูลผู้ใช้เมื่อโหลดเสร็จและไม่มีข้อผิดพลาด */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">อีเมล</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                      ไม่พบข้อมูลผู้ใช้
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

สิ่งที่ได้เรียนรู้และข้อเปรียบเทียบ
จากการทำ Workshop นี้ นักศึกษาจะได้เห็นภาพรวมของการทำงานของ Web Service ทั้งในฝั่ง Server และ Client รวมถึงความแตกต่างในการพัฒนาด้วยเทคโนโลยีที่แตกต่างกัน:

PHP (Server-side): เหมาะสำหรับการสร้าง Web Service (API) ที่จัดการ Logic ฝั่ง Backend, การเชื่อมต่อฐานข้อมูล และการประมวลผลข้อมูลบน Server มีความง่ายในการตั้งค่าและรันบน Web Server ทั่วไป

PHP (Client-side): เหมาะสำหรับงานง่ายๆ ที่ไม่ต้องการ UI ที่ซับซ้อน หรือการสื่อสารแบบ Backend-to-Backend

Next.js (Client-side / React): เหมาะสำหรับการสร้าง User Interface (UI) ที่มีความซับซ้อน, โต้ตอบกับผู้ใช้ได้ดี (Interactive UI), และให้ประสบการณ์ผู้ใช้ที่ราบรื่น (Single Page Application - SPA) โดยใช้ JavaScript เป็นหลัก

ข้อเปรียบเทียบหลัก:

คุณสมบัติ

PHP (Server/Client)

Next.js (Client)

บทบาทหลัก

Backend (API), Server-side Scripting

Frontend (UI), Single Page Application (SPA)

ภาษา

PHP

JavaScript / TypeScript

การแสดงผล

Server-side Rendering (ส่ง HTML สำเร็จรูป)

Client-side Rendering (สร้าง UI บน Browser)

การโต้ตอบ UI

จำกัด (ต้องโหลดหน้าใหม่)

สูง (โต้ตอบได้ทันที, ไม่ต้องโหลดหน้าใหม่)

ความซับซ้อน

ง่ายสำหรับ API พื้นฐาน

ซับซ้อนกว่าในการตั้งค่าเริ่มต้นและเรียนรู้ React

การใช้งาน

เว็บไซต์ทั่วไป, ระบบจัดการข้อมูล, API Backend

Web Application สมัยใหม่, Mobile App (React Native)

การต่อยอดการเรียนรู้
การส่งข้อมูลแบบอื่น: ลองสร้าง API ที่รับข้อมูลแบบ POST, PUT, DELETE เพื่อจัดการข้อมูล (เพิ่ม, แก้ไข, ลบ)

การจัดการ Error: พัฒนาการจัดการข้อผิดพลาด (Error Handling) ทั้งฝั่ง Server และ Client ให้มีประสิทธิภาพมากขึ้น

การยืนยันตัวตน (Authentication) และการอนุญาต (Authorization): เรียนรู้การใช้ JWT (JSON Web Tokens) หรือ OAuth ในการรักษาความปลอดภัยของ Web Service

Frameworks:

PHP: ลองใช้ PHP Frameworks เช่น Laravel หรือ Lumen ในการสร้าง RESTful API ที่มีโครงสร้างและฟังก์ชันการทำงานที่ครบครัน

JavaScript: ลองใช้ Library อื่นๆ สำหรับการเรียก API เช่น Axios หรือเรียนรู้ State Management Libraries เช่น Redux, Zustand สำหรับ React/Next.js

Database Integration: เชื่อมต่อ Web Service กับฐานข้อมูลจริง (เช่น MySQL, PostgreSQL) เพื่อจัดการข้อมูลแบบ Dynamic

หวังว่าเอกสารนี้จะเป็นประโยชน์สำหรับการสอนและเรียนรู้ Web Service ครับ!
