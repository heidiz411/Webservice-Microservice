// --- SERVER-SIDE FUNCTIONS (Code.gs) ---

const SHEET_NAME = "Data";
const ID_COLUMN = 1; // Column A
const TITLE_COLUMN = 2; // Column B
const AUTHOR_COLUMN = 3; // Column C

/**
 * Returns the active sheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet} The active sheet.
 */
function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

/**
 * Generates a unique ID (simple example, improve for production).
 * @return {string} A unique ID.
 */
function generateId() {
  return "ITEM_" + new Date().getTime();
}

/**
 * CREATE: Adds a new item to the sheet.
 * @param {Object} itemData - An object containing title and author.
 * @return {Object} The created item with its ID.
 */
function createItem(itemData) {
  const sheet = getSheet();
  const newId = generateId();
  const row = [newId, itemData.title, itemData.author]; // Changed to title, author
  sheet.appendRow(row);
  return { id: newId, title: itemData.title, author: itemData.author }; // Changed to title, author
}

/**
 * READ: Retrieves all items or a specific item by ID.
 * @param {string} [itemId] - Optional ID of the item to retrieve. If not provided, all items are returned.
 * @return {Array<Object>|Object|null} An array of items, a single item object, or null if not found.
 */
function readItems(itemId) {
  const sheet = getSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();

  // Skip header row
  const dataRows = values.slice(1);

  const items = dataRows.map(row => ({
    id: row[ID_COLUMN - 1],
    title: row[TITLE_COLUMN - 1], // Changed to TITLE_COLUMN
    author: row[AUTHOR_COLUMN - 1] // Changed to AUTHOR_COLUMN
  }));

  if (itemId) {
    return items.find(item => item.id === itemId) || null;
  }
  return items;
}

/**
 * UPDATE: Updates an existing item by ID.
 * @param {Object} itemData - An object containing id, title, and author.
 * @return {Object|null} The updated item object, or null if not found.
 */
function updateItem(itemData) {
  const sheet = getSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();

  // Find the row index of the item
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) { // Start from 1 to skip header
    if (values[i][ID_COLUMN - 1] === itemData.id) {
      rowIndex = i;
      break;
    }
  }

  if (rowIndex !== -1) {
    sheet.getRange(rowIndex + 1, TITLE_COLUMN).setValue(itemData.title); // Changed to TITLE_COLUMN
    sheet.getRange(rowIndex + 1, AUTHOR_COLUMN).setValue(itemData.author); // Changed to AUTHOR_COLUMN
    return itemData; // Return the updated data
  }
  return null;
}

/**
 * DELETE: Deletes an item by ID.
 * @param {string} itemId - The ID of the item to delete.
 * @return {boolean} True if deleted, false otherwise.
 */
function deleteItem(itemId) {
  const sheet = getSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();

  // Find the row index of the item
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

// --- API ENDPOINTS FOR POSTMAN ---

/**
 * Handles HTTP GET requests. Used for reading data.
 * @param {GoogleAppsScript.Events.DoGet} e - The event object for the GET request.
 * @return {GoogleAppsScript.Content.TextOutput} A JSON response.
 */
function doGet(e) {
  try {
    const params = e.parameter;
    const itemId = params.id; // Get ID from query parameter if provided

    let result;
    if (itemId) {
      result = readItems(itemId);
    } else {
      result = readItems(); // Read all items
    }

    if (result) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", data: result }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Item not found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles HTTP POST requests. Used for creating, updating, and deleting data.
 * @param {GoogleAppsScript.Events.DoPost} e - The event object for the POST request.
 * @return {GoogleAppsScript.Content.TextOutput} A JSON response.
 */
function doPost(e) {
  let result;
  let success = false;
  let message = '';

  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action; // e.g., 'create', 'update', 'delete', 'read'
    const data = postData.data; // The actual item data

    switch (action) {
      case 'create':
        result = createItem(data);
        success = true;
        message = 'Item created successfully';
        break;
      case 'update':
        result = updateItem(data);
        if (result) {
          success = true;
          message = 'Item updated successfully';
        } else {
          message = 'Item not found for update';
        }
        break;
      case 'delete':
        if (data && data.id) {
          success = deleteItem(data.id);
          if (success) {
            message = 'Item deleted successfully';
          } else {
            message = 'Item not found for deletion';
          }
        } else {
          message = 'ID is required for deletion';
        }
        break;
      case 'read': // You can also handle 'read' via POST if preferred
        if (data && data.id) {
          result = readItems(data.id);
          if (result) {
            success = true;
            message = 'Item found';
          } else {
            message = 'Item not found';
          }
        } else {
          result = readItems();
          success = true;
          message = 'All items retrieved';
        }
        break;
      default:
        message = 'Invalid action specified';
        break;
    }

    if (success) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: message, data: result }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: message }))
        .setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
