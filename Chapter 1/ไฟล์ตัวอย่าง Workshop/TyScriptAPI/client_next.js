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
