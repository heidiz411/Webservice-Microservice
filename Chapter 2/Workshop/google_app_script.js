// --- GLOBAL CONFIGURATION (โค้ดการกำหนดค่าสากล) ---
const SHEET_NAME = "Data";
const ID_COLUMN = 1; // Column A
const TITLE_COLUMN = 2; // Column B
const AUTHOR_COLUMN = 3; // Column C

// แทนที่ด้วยค่า Channel Access Token และ Channel Secret ของคุณจาก Line Developers Console
const LINE_CHANNEL_ACCESS_TOKEN = "YOUR_LINE_CHANNEL_ACCESS_TOKEN"; // เช่น "Ew...="
const LINE_CHANNEL_SECRET = "YOUR_LINE_CHANNEL_SECRET"; // เช่น "123..."

/**
 * Gets the active sheet.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The active sheet.
 */
function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

/**
 * Generates a unique ID (simple example, improve for production).
 * @returns {string} A unique ID.
 */
function generateId() {
  return "ITEM_" + new Date().getTime();
}

/**
 * CREATE: Adds a new item to the sheet.
 * @param {Object} itemData - An object containing title and author.
 * @returns {Object} The created item with its ID.
 */
function createItem(itemData) {
  const sheet = getSheet();
  const newId = generateId();
  const row = [newId, itemData.title, itemData.author];
  sheet.appendRow(row);
  return { id: newId, title: itemData.title, author: itemData.author };
}

/**
 * READ: Retrieves all items or a specific item by ID.
 * @param {string} [itemId] - Optional ID of the item to retrieve. If not provided, all items are returned.
 * @returns {Array<Object>|Object|null} An array of items, a single item object, or null if not found.
 */
function readItems(itemId) {
  const sheet = getSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();

  if (values.length < 2) return []; // No data rows, only header

  const dataRows = values.slice(1); // Skip header row

  const items = dataRows.map(row => ({
    id: row[ID_COLUMN - 1],
    title: row[TITLE_COLUMN - 1],
    author: row[AUTHOR_COLUMN - 1]
  }));

  if (itemId) {
    return items.find(item => item.id === itemId) || null;
  }
  return items;
}

/**
 * UPDATE: Updates an existing item by ID.
 * @param {Object} itemData - An object containing id, title, and author.
 * @returns {Object|null} The updated item object, or null if not found.
 */
function updateItem(itemData) {
  const sheet = getSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();

  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) { // Start from 1 to skip header
    if (values[i][ID_COLUMN - 1] === itemData.id) {
      rowIndex = i;
      break;
    }
  }

  if (rowIndex !== -1) {
    sheet.getRange(rowIndex + 1, TITLE_COLUMN).setValue(itemData.title);
    sheet.getRange(rowIndex + 1, AUTHOR_COLUMN).setValue(itemData.author);
    return itemData;
  }
  return null;
}

/**
 * DELETE: Deletes an item by ID.
 * @param {string} itemId - The ID of the item to delete.
 * @returns {boolean} True if deleted, false otherwise.
 */
function deleteItem(itemId) {
  const sheet = getSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();

  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) { // Start from 1 to skip header
    if (values[i][ID_COLUMN - 1] === itemId) {
      rowIndex = i;
      break;
    }
  }

  if (rowIndex !== -1) {
    sheet.deleteRow(rowIndex + 1); // +1 because sheet rows are 1-indexed
    return true;
  }
  return false;
}

// --- LINE MESSAGING API INTEGRATION (การผสานรวม Line Messaging API) ---

/**
 * Sends a reply message to Line.
 * @param {string} replyToken - The reply token received from Line.
 * @param {string} messageText - The text message to send back.
 */
function replyToLine(replyToken, messageText) {
  const url = "https://api.line.me/v2/bot/message/reply";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + LINE_CHANNEL_ACCESS_TOKEN
  };
  const payload = {
    replyToken: replyToken,
    messages: [{
      type: "text",
      text: messageText
    }]
  };

  const options = {
    method: "post",
    headers: headers,
    payload: JSON.stringify(payload)
  };

  try {
    UrlFetchApp.fetch(url, options);
  } catch (e) {
    console.error("Failed to send reply to Line:", e);
  }
}

/**
 * Handles incoming Line webhook POST requests.
 * This function will be the main entry point for Line messages.
 * @param {GoogleAppsScript.Events.DoPost} e - The event object from the POST request.
 * @returns {GoogleAppsScript.Content.TextOutput} A JSON response.
 */
function doPost(e) {
  let replyMessage = "ขออภัย ไม่เข้าใจคำสั่งของคุณ กรุณาลองใหม่";

  try {
    const json = JSON.parse(e.postData.contents);
    const events = json.events;

    if (events && events.length > 0) {
      const event = events[0]; // Process the first event
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

      console.log("Received message:", userMessage);

      // Define command format: ACTION:param1:param2...
      // Examples:
      // สร้าง:ชื่อหนังสือ:ผู้แต่ง
      // อ่าน:ID_ของ_หนังสือ
      // อ่านทั้งหมด
      // อัปเดต:ID_ของ_หนังสือ:ชื่อใหม่:ผู้แต่งใหม่
      // ลบ:ID_ของ_หนังสือ

      const parts = userMessage.split(':');
      const action = parts[0].toLowerCase();

      switch (action) {
        case 'สร้าง':
          if (parts.length === 3) {
            const title = parts[1].trim();
            const author = parts[2].trim();
            const newItem = createItem({ title: title, author: author });
            replyMessage = `สร้างสำเร็จ!\nID: ${newItem.id}\nชื่อเรื่อง: ${newItem.title}\nผู้แต่ง: ${newItem.author}`;
          } else {
            replyMessage = "รูปแบบคำสั่งสร้างไม่ถูกต้อง: สร้าง:ชื่อหนังสือ:ผู้แต่ง";
          }
          break;

        case 'อ่าน':
          if (parts.length === 2) { // Read specific item
            const itemId = parts[1].trim();
            const item = readItems(itemId);
            if (item) {
              replyMessage = `ข้อมูล:\nID: ${item.id}\nชื่อเรื่อง: ${item.title}\nผู้แต่ง: ${item.author}`;
            } else {
              replyMessage = `ไม่พบรายการ ID: ${itemId}`;
            }
          } else if (userMessage.toLowerCase() === 'อ่านทั้งหมด') { // Read all items
            const allItems = readItems();
            if (allItems.length > 0) {
              replyMessage = "รายการทั้งหมด:\n";
              allItems.forEach(item => {
                replyMessage += `ID: ${item.id}, ชื่อเรื่อง: ${item.title}, ผู้แต่ง: ${item.author}\n`;
              });
            } else {
              replyMessage = "ไม่มีรายการในระบบ";
            }
          } else {
            replyMessage = "รูปแบบคำสั่งอ่านไม่ถูกต้อง: อ่าน:ID_ของ_หนังสือ หรือ อ่านทั้งหมด";
          }
          break;

        case 'อัปเดต':
          if (parts.length === 4) {
            const itemId = parts[1].trim();
            const newTitle = parts[2].trim();
            const newAuthor = parts[3].trim();
            const updatedItem = updateItem({ id: itemId, title: newTitle, author: newAuthor });
            if (updatedItem) {
              replyMessage = `อัปเดตสำเร็จ!\nID: ${updatedItem.id}\nชื่อเรื่อง: ${updatedItem.title}\nผู้แต่ง: ${updatedItem.author}`;
            } else {
              replyMessage = `ไม่พบรายการ ID: ${itemId} สำหรับอัปเดต`;
            }
          } else {
            replyMessage = "รูปแบบคำสั่งอัปเดตไม่ถูกต้อง: อัปเดต:ID_ของ_หนังสือ:ชื่อใหม่:ผู้แต่งใหม่";
          }
          break;

        case 'ลบ':
          if (parts.length === 2) {
            const itemId = parts[1].trim();
            const deleted = deleteItem(itemId);
            if (deleted) {
              replyMessage = `ลบรายการ ID: ${itemId} สำเร็จแล้ว`;
            } else {
              replyMessage = `ไม่พบรายการ ID: ${itemId} สำหรับลบ`;
            }
          } else {
            replyMessage = "รูปแบบคำสั่งลบไม่ถูกต้อง: ลบ:ID_ของ_หนังสือ";
          }
          break;

        default:
          replyMessage = "คำสั่งไม่ถูกต้อง กรุณาใช้: สร้าง, อ่าน, อัปเดต, ลบ หรือ อ่านทั้งหมด";
          break;
      }

      replyToLine(replyToken, replyMessage);
    }
  } catch (e) {
    console.error("Error processing webhook:", e);
    // You might want to reply with an error message to the user here as well
  }

  // Acknowledge the webhook received
  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}


// This doGet is for serving the HTML, not for API calls directly
/**
 * Serves the HTML file for the web app.
 * @returns {GoogleAppsScript.HTML.HtmlOutput} The HTML output.
 */
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
      .setTitle('CRUD App')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}