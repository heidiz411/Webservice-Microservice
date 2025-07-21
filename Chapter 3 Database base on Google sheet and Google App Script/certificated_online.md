## **ขั้นตอนการสร้างระบบดาวน์โหลดเกียรติบัตรออนไลน์**

ระบบนี้จะทำงานโดยการดึงข้อมูลจาก Google Sheet, นำไปใส่ในแม่แบบ Google Slide, บันทึกเป็นไฟล์ PDF และเก็บไว้ใน Google Drive

### **1\. การเตรียมการใน Google Drive**

ขั้นแรกคือการจัดระเบียบไฟล์ใน Google Drive ของคุณ:

1. **สร้างโฟลเดอร์หลัก:** สร้างโฟลเดอร์ใหม่ใน Google Drive ของคุณ เช่น "ระบบเกียรติบัตรออนไลน์"  
2. **สร้างโฟลเดอร์ย่อย:** ภายในโฟลเดอร์หลัก ให้สร้างโฟลเดอร์ย่อย 2 โฟลเดอร์:  
   * "แม่แบบเกียรติบัตร" (สำหรับเก็บไฟล์ Google Slide แม่แบบ)  
   * "เกียรติบัตร PDF" (สำหรับเก็บไฟล์ PDF ที่สร้างขึ้น)

### **2\. การตั้งค่า Google Sheet (ฐานข้อมูล)**

Google Sheet จะเป็นแหล่งข้อมูลสำหรับเกียรติบัตรของคุณ:

1. **สร้าง Google Sheet ใหม่:** ในโฟลเดอร์ "ระบบเกียรติบัตรออนไลน์" ให้สร้าง Google Sheet ใหม่ ตั้งชื่อว่า "ข้อมูลเกียรติบัตร"  
2. **ตั้งค่าหัวข้อคอลัมน์:** ในแถวแรก (Header Row) ของ Sheet ให้กำหนดหัวข้อคอลัมน์ที่คุณต้องการให้ปรากฏบนเกียรติบัตร ตัวอย่างเช่น:  
   * ชื่อ-นามสกุล (หรือ Name)  
   * กิจกรรม (หรือ Activity)  
   * วันที่ (หรือ Date)  
   * ลำดับที่ (หรือ CertificateID)  
   * สถานะ (สำหรับติดตามว่าสร้าง PDF แล้วหรือยัง)  
   * ลิงก์ดาวน์โหลด (สำหรับเก็บลิงก์ดาวน์โหลดไฟล์ PDF)  
   * File ID (สำหรับเก็บ ID ของไฟล์ PDF ใน Google Drive)  
3. **กรอกข้อมูลตัวอย่าง:** กรอกข้อมูลตัวอย่างลงใน Sheet เพื่อใช้ทดสอบระบบ

### **3\. การสร้างแม่แบบ Google Slide**

Google Slide จะเป็นแม่แบบสำหรับเกียรติบัตรของคุณ:

1. **สร้าง Google Slide ใหม่:** ในโฟลเดอร์ "แม่แบบเกียรติบัตร" ให้สร้าง Google Slide ใหม่ ตั้งชื่อว่า "แม่แบบเกียรติบัตร"  
2. **ออกแบบเกียรติบัตร:** ออกแบบเกียรติบัตรตามที่คุณต้องการ  
3. **กำหนด Placeholder:** สำหรับข้อมูลที่จะดึงมาจาก Google Sheet ให้ใช้ "Placeholder" โดยการใส่ข้อความในวงเล็บปีกกาคู่ {{ }} ตัวอย่างเช่น:  
   * {{ชื่อ-นามสกุล}}  
   * {{กิจกรรม}}  
   * {{วันที่}}  
   * {{ลำดับที่}}  
   * **สำคัญ:** ชื่อของ Placeholder ใน Google Slide {{ }} ต้องตรงกับชื่อหัวข้อคอลัมน์ใน Google Sheet ทุกประการ (รวมถึงตัวพิมพ์ใหญ่-เล็ก)

### **4\. การเขียน Google Apps Script**

ส่วนนี้คือหัวใจของระบบ ที่จะเชื่อมโยงทุกอย่างเข้าด้วยกัน:

1. **เปิด Script Editor:** ใน Google Sheet "ข้อมูลเกียรติบัตร" ไปที่เมนู ส่วนขยาย (Extensions) \> Apps Script  
2. **เขียนโค้ด:** ลบโค้ดที่มีอยู่ทั้งหมด และวางโค้ดด้านล่างนี้ลงไป:  
   /\*\*  
    \* @file Code for generating and managing online certificates.  
    \* @author Your Name  
    \* @version 1.0.0  
    \*/

   // \--- Global Configuration \---  
   const SPREADSHEET\_NAME \= "ข้อมูลเกียรติบัตร"; // Name of your Google Sheet  
   const SLIDE\_TEMPLATE\_NAME \= "แม่แบบเกียรติบัตร"; // Name of your Google Slide template  
   const PDF\_OUTPUT\_FOLDER\_NAME \= "เกียรติบัตร PDF"; // Name of the folder to save PDFs  
   const TEMPLATE\_FOLDER\_NAME \= "แม่แบบเกียรติบัตร"; // Name of the folder containing the template

   /\*\*  
    \* Finds a folder by its name within the user's Google Drive.  
    \* If the folder does not exist, it will be created.  
    \* @param {string} folderName The name of the folder to find or create.  
    \* @returns {GoogleAppsScript.Drive.Folder} The found or created folder object.  
    \*/  
   function getOrCreateFolder(folderName) {  
     const folders \= DriveApp.getFoldersByName(folderName);  
     if (folders.hasNext()) {  
       return folders.next();  
     } else {  
       // If the folder doesn't exist, create it in the root or a specific parent folder.  
       // For simplicity, this creates it in the root. You might want to specify a parent.  
       return DriveApp.createFolder(folderName);  
     }  
   }

   /\*\*  
    \* Finds a file (Google Slide template) by its name within a specified folder.  
    \* @param {string} fileName The name of the file to find.  
    \* @param {GoogleAppsScript.Drive.Folder} folder The folder to search within.  
    \* @returns {GoogleAppsScript.Drive.File | null} The found file object, or null if not found.  
    \*/  
   function findFileInFolder(fileName, folder) {  
     const files \= folder.getFilesByName(fileName);  
     if (files.hasNext()) {  
       return files.next();  
     }  
     return null;  
   }

   /\*\*  
    \* Generates a PDF certificate for each row in the Google Sheet that hasn't been processed.  
    \* Replaces placeholders in the Google Slide template with data from the sheet.  
    \*/  
   function generateCertificates() {  
     const ss \= SpreadsheetApp.getActiveSpreadsheet();  
     const sheet \= ss.getSheetByName(SPREADSHEET\_NAME);

     if (\!sheet) {  
       Logger.log(\`Error: Sheet named "${SPREADSHEET\_NAME}" not found.\`);  
       SpreadsheetApp.getUi().alert('เกิดข้อผิดพลาด', \`ไม่พบชีทชื่อ "${SPREADSHEET\_NAME}" โปรดตรวจสอบชื่อชีท\`, SpreadsheetApp.getUi().ButtonSet.OK);  
       return;  
     }

     const dataRange \= sheet.getDataRange();  
     const values \= dataRange.getValues();  
     const headers \= values\[0\]; // First row contains headers

     // Get folder objects  
     const pdfOutputFolder \= getOrCreateFolder(PDF\_OUTPUT\_FOLDER\_NAME);  
     const templateFolder \= getOrCreateFolder(TEMPLATE\_FOLDER\_NAME);

     // Find the Google Slide template file  
     const templateFile \= findFileInFolder(SLIDE\_TEMPLATE\_NAME, templateFolder);

     if (\!templateFile) {  
       Logger.log(\`Error: Google Slide template named "${SLIDE\_TEMPLATE\_NAME}" not found in folder "${TEMPLATE\_FOLDER\_NAME}".\`);  
       SpreadsheetApp.getUi().alert('เกิดข้อผิดพลาด', \`ไม่พบแม่แบบ Google Slide ชื่อ "${SLIDE\_TEMPLATE\_NAME}" ในโฟลเดอร์ "${TEMPLATE\_FOLDER\_NAME}" โปรดตรวจสอบชื่อไฟล์และโฟลเดอร์\`, SpreadsheetApp.getUi().ButtonSet.OK);  
       return;  
     }

     // Start processing from the second row (index 1\) to skip headers  
     for (let i \= 1; i \< values.length; i++) {  
       const row \= values\[i\];  
       const rowNum \= i \+ 1; // Current row number in the sheet

       // Check if the certificate has already been generated (based on 'สถานะ' column)  
       const statusColIndex \= headers.indexOf('สถานะ');  
       if (statusColIndex \=== \-1) {  
           Logger.log("Error: 'สถานะ' column not found in Google Sheet headers.");  
           SpreadsheetApp.getUi().alert('เกิดข้อผิดพลาด', 'ไม่พบหัวข้อคอลัมน์ "สถานะ" ใน Google Sheet โปรดเพิ่มคอลัมน์นี้', SpreadsheetApp.getUi().ButtonSet.OK);  
           return;  
       }

       if (row\[statusColIndex\] \=== "สร้างแล้ว") {  
         Logger.log(\`Skipping row ${rowNum}: Certificate already generated.\`);  
         continue; // Skip this row if already processed  
       }

       try {  
         // Make a copy of the template  
         const presentation \= SlidesApp.openById(templateFile.getId());  
         const newPresentation \= presentation.makeCopy(\`เกียรติบัตร\_${row\[headers.indexOf('ชื่อ-นามสกุล')\]}\_${row\[headers.indexOf('ลำดับที่')\] || rowNum}\`, pdfOutputFolder);  
         const newSlide \= SlidesApp.openById(newPresentation.getId());

         // Replace placeholders  
         headers.forEach((header, index) \=\> {  
           const placeholder \= \`{{${header}}}\`;  
           const value \= row\[index\] ? String(row\[index\]) : ''; // Ensure value is a string  
           newSlide.replaceAllText(placeholder, value);  
         });

         // Save as PDF  
         const pdfBlob \= newSlide.getBlob().getAs('application/pdf');  
         const pdfFileName \= \`เกียรติบัตร\_${row\[headers.indexOf('ชื่อ-นามสกุล')\]}\_${row\[headers.indexOf('ลำดับที่')\] || rowNum}.pdf\`;  
         const pdfFile \= pdfOutputFolder.createFile(pdfBlob.setName(pdfFileName));

         // Get the download link and file ID  
         const downloadLink \= pdfFile.getDownloadUrl();  
         const fileId \= pdfFile.getId();

         // Update the Google Sheet with status, link, and file ID  
         const linkColIndex \= headers.indexOf('ลิงก์ดาวน์โหลด');  
         const fileIdColIndex \= headers.indexOf('File ID');

         if (linkColIndex \!== \-1) {  
           sheet.getRange(rowNum, linkColIndex \+ 1).setValue(downloadLink);  
         } else {  
           Logger.log("Warning: 'ลิงก์ดาวน์โหลด' column not found. Cannot save download link.");  
         }

         if (fileIdColIndex \!== \-1) {  
           sheet.getRange(rowNum, fileIdColIndex \+ 1).setValue(fileId);  
         } else {  
           Logger.log("Warning: 'File ID' column not found. Cannot save file ID.");  
         }

         sheet.getRange(rowNum, statusColIndex \+ 1).setValue("สร้างแล้ว"); // Mark as processed

         Logger.log(\`Generated certificate for ${row\[headers.indexOf('ชื่อ-นามสกุล')\]} (Row ${rowNum}). File ID: ${fileId}\`);  
         // Close the copied presentation to avoid issues  
         DriveApp.getFileById(newPresentation.getId()).setTrashed(true); // Delete the temporary Google Slide copy  
       } catch (e) {  
         Logger.log(\`Error processing row ${rowNum}: ${e.message}\`);  
         sheet.getRange(rowNum, statusColIndex \+ 1).setValue("เกิดข้อผิดพลาด"); // Mark as error  
         SpreadsheetApp.getUi().alert('เกิดข้อผิดพลาด', \`ไม่สามารถสร้างเกียรติบัตรสำหรับแถวที่ ${rowNum} ได้: ${e.message}\`, SpreadsheetApp.getUi().ButtonSet.OK);  
       }  
     }  
     SpreadsheetApp.getUi().alert('เสร็จสิ้น', 'การสร้างเกียรติบัตรเสร็จสมบูรณ์แล้ว\!', SpreadsheetApp.getUi().ButtonSet.OK);  
   }

   /\*\*  
    \* Retrieves a list of names and their corresponding download links from the Google Sheet.  
    \* Only includes entries where the 'สถานะ' (status) is 'สร้างแล้ว' (generated).  
    \* @returns {Array\<Object\>} An array of objects, each containing 'name' and 'downloadLink'.  
    \*/  
   function getCertificateData() {  
     const ss \= SpreadsheetApp.getActiveSpreadsheet();  
     const sheet \= ss.getSheetByName(SPREADSHEET\_NAME);

     if (\!sheet) {  
       Logger.log(\`Error: Sheet named "${SPREADSHEET\_NAME}" not found.\`);  
       return \[\];  
     }

     const dataRange \= sheet.getDataRange();  
     const values \= dataRange.getValues();  
     const headers \= values\[0\]; // First row contains headers

     const nameColIndex \= headers.indexOf('ชื่อ-นามสกุล');  
     const linkColIndex \= headers.indexOf('ลิงก์ดาวน์โหลด');  
     const statusColIndex \= headers.indexOf('สถานะ');

     if (nameColIndex \=== \-1 || linkColIndex \=== \-1 || statusColIndex \=== \-1) {  
       Logger.log("Error: Missing required columns ('ชื่อ-นามสกุล', 'ลิงก์ดาวน์โหลด', or 'สถานะ') in Google Sheet headers.");  
       return \[\];  
     }

     const certificateData \= \[\];  
     for (let i \= 1; i \< values.length; i++) {  
       const row \= values\[i\];  
       if (row\[statusColIndex\] \=== "สร้างแล้ว" && row\[nameColIndex\] && row\[linkColIndex\]) {  
         certificateData.push({  
           name: row\[nameColIndex\],  
           downloadLink: row\[linkColIndex\]  
         });  
       }  
     }  
     return certificateData;  
   }

   /\*\*  
    \* Serves the index.html file as a web app.  
    \* @param {GoogleAppsScript.Events.DoGet} e The event object for the GET request.  
    \* @returns {GoogleAppsScript.HTML.HtmlOutput} The HTML content to be served.  
    \*/  
   function doGet(e) {  
     return HtmlService.createTemplateFromFile('index')  
         .evaluate()  
         .setTitle('ดาวน์โหลดเกียรติบัตรออนไลน์')  
         .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Allow embedding in iframes  
   }

   /\*\*  
    \* Adds a custom menu to the Google Sheet for easy access to the script.  
    \* This function runs automatically when the spreadsheet is opened.  
    \*/  
   function onOpen() {  
     const ui \= SpreadsheetApp.getUi();  
     ui.createMenu('เครื่องมือเกียรติบัตร')  
         .addItem('สร้างเกียรติบัตรทั้งหมด', 'generateCertificates')  
         .addItem('เปิดหน้าดาวน์โหลดเกียรติบัตร', 'openDownloadPage') // New menu item  
         .addToUi();  
   }

   /\*\*  
    \* Opens the deployed web app URL in a new tab.  
    \*/  
   function openDownloadPage() {  
     const scriptUrl \= ScriptApp.getService().getUrl();  
     const htmlOutput \= HtmlService.createHtmlOutput(\`\<script\>window.open('${scriptUrl}', '\_blank'); google.script.host.close();\</script\>\`)  
         .setWidth(100).setHeight(1);  
     SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'กำลังเปิดหน้าดาวน์โหลด...');  
   }

3. **บันทึก Script:** คลิกไอคอนบันทึก (รูปแผ่นดิสก์)  
4. **ตั้งชื่อโปรเจกต์:** ตั้งชื่อโปรเจกต์ เช่น "ระบบเกียรติบัตรอัตโนมัติ"  
5. **ตรวจสอบและให้สิทธิ์:**  
   * ครั้งแรกที่คุณรันฟังก์ชัน generateCertificates หรือเมื่อเปิด Google Sheet (เพื่อสร้างเมนู เครื่องมือเกียรติบัตร) คุณจะต้องให้สิทธิ์แก่ Apps Script ในการเข้าถึง Google Drive, Google Sheets และ Google Slides ของคุณ  
   * คลิก ตรวจสอบสิทธิ์ (Review permissions)  
   * เลือกบัญชี Google ของคุณ  
   * คลิก อนุญาต (Allow)

### **5\. การเรียกใช้ Script**

มี 2 วิธีในการเรียกใช้ Script:

1. **ผ่านเมนูที่กำหนดเอง:**  
   * กลับไปที่ Google Sheet "ข้อมูลเกียรติบัตร"  
   * รีเฟรชหน้าเว็บ (F5) หากยังไม่เห็นเมนูใหม่  
   * คุณจะเห็นเมนูใหม่ชื่อ เครื่องมือเกียรติบัตร บนแถบเมนู  
   * คลิก เครื่องมือเกียรติบัตร \> สร้างเกียรติบัตรทั้งหมด  
   * สคริปต์จะเริ่มทำงานและสร้างไฟล์ PDF ในโฟลเดอร์ "เกียรติบัตร PDF" และอัปเดตสถานะและลิงก์ใน Google Sheet  
2. **ผ่าน Apps Script Editor:**  
   * ใน Apps Script Editor เลือกฟังก์ชัน generateCertificates จากเมนูแบบเลื่อนลงด้านบน (ข้างปุ่ม รัน (Run))  
   * คลิกปุ่ม รัน (Run) (รูปสามเหลี่ยม)

### **คำแนะนำเพิ่มเติม:**

* **การจัดการข้อผิดพลาด:** โค้ดนี้มีการจัดการข้อผิดพลาดพื้นฐาน แต่คุณสามารถเพิ่มการตรวจสอบและข้อความแจ้งเตือนที่ละเอียดขึ้นได้  
* **การปรับปรุงประสิทธิภาพ:** หากคุณมีข้อมูลจำนวนมาก (หลายร้อยหรือหลายพันแถว) การประมวลผลอาจใช้เวลานาน คุณอาจพิจารณาการประมวลผลแบบเป็นชุด หรือใช้ Trigger แบบ Time-driven เพื่อรัน Script เป็นระยะ  
* **การแชร์เกียรติบัตร:** ลิงก์ดาวน์โหลดที่สร้างขึ้นจะใช้ได้ หากไฟล์ PDF ใน Google Drive ถูกตั้งค่าให้แชร์ได้ (เช่น "ทุกคนที่มีลิงก์สามารถดูได้") คุณสามารถตั้งค่าการแชร์โฟลเดอร์ "เกียรติบัตร PDF" ล่วงหน้าได้  
* **การปรับแต่งชื่อไฟล์:** คุณสามารถปรับแต่งชื่อไฟล์ PDF ได้ในโค้ด โดยเปลี่ยนส่วน pdfFileName  
* **การลบสำเนา Google Slide ชั่วคราว:** โค้ดจะสร้างสำเนาของ Google Slide template ชั่วคราวเพื่อทำการแทนที่ข้อความ จากนั้นแปลงเป็น PDF และลบสำเนาชั่วคราวนั้นทิ้งด้วย setTrashed(true) เพื่อไม่ให้มีไฟล์ขยะใน Drive ของคุณ  
* **การ Deploy Web App:**  
  1. ใน Apps Script Editor ไปที่เมนู ทำให้ใช้งานได้ (Deploy) \> การทำให้ใช้งานได้ใหม่ (New deployment)  
  2. เลือกประเภท แอปบนเว็บ (Web app)  
  3. ตั้งค่า:  
     * **Execute as:** Me (บัญชีของคุณ)  
     * **Who has access:** Anyone (เพื่อให้ทุกคนสามารถเข้าถึงหน้าดาวน์โหลดได้)  
  4. คลิก ทำให้ใช้งานได้ (Deploy)  
  5. คัดลอก URL ของแอปบนเว็บ (Web app URL) ที่ได้มา นี่คือลิงก์ที่คุณจะใช้เข้าถึงหน้าดาวน์โหลดเกียรติบัตร

หวังว่าขั้นตอนเหล่านี้จะเป็นประโยชน์และช่วยให้คุณสร้างระบบดาวน์โหลดเกียรติบัตรออนไลน์ได้สำเร็จนะครับ\!