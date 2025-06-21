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
```php
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
