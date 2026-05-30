const NOTE_STATUS_CONFIG = {
  spreadsheetId: '1_GTcBfsZ5NGNyu2adeTqRn3U0dMFo6uVTEP-_K5BP7s',
  sheetName: '筆記',
  noteColumn: 1,
  sourceColumn: 2,
  statusHeader: '狀態',
  importedStatus: '已匯入',
};

function markImportedRows() {
  const sheet = getNoteSheet_();
  const statusColumn = ensureStatusColumn_(sheet);
  const importedRows = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  importedRows.forEach((row) => {
    sheet.getRange(row, statusColumn).setValue(NOTE_STATUS_CONFIG.importedStatus);
  });
}

function deleteImportedRows() {
  const sheet = getNoteSheet_();
  const statusColumn = ensureStatusColumn_(sheet);
  const lastRow = sheet.getLastRow();

  for (let row = lastRow; row >= 2; row -= 1) {
    if (sheet.getRange(row, statusColumn).getValue() === NOTE_STATUS_CONFIG.importedStatus) {
      sheet.deleteRow(row);
    }
  }
}

function getUnimportedRows() {
  const sheet = getNoteSheet_();
  const statusColumn = ensureStatusColumn_(sheet);
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const values = sheet.getRange(2, 1, lastRow - 1, statusColumn).getValues();
  return values
    .map((row, index) => ({
      rowNumber: index + 2,
      note: row[NOTE_STATUS_CONFIG.noteColumn - 1],
      source: row[NOTE_STATUS_CONFIG.sourceColumn - 1],
      status: row[statusColumn - 1],
    }))
    .filter((row) => row.note && row.status !== NOTE_STATUS_CONFIG.importedStatus);
}

function getNoteSheet_() {
  const spreadsheet = SpreadsheetApp.openById(NOTE_STATUS_CONFIG.spreadsheetId);
  const sheet = spreadsheet.getSheetByName(NOTE_STATUS_CONFIG.sheetName);
  if (!sheet) {
    throw new Error(`Sheet not found: ${NOTE_STATUS_CONFIG.sheetName}`);
  }
  return sheet;
}

function ensureStatusColumn_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const existingIndex = headers.indexOf(NOTE_STATUS_CONFIG.statusHeader);

  if (existingIndex >= 0) {
    return existingIndex + 1;
  }

  const statusColumn = lastColumn + 1;
  sheet.getRange(1, statusColumn).setValue(NOTE_STATUS_CONFIG.statusHeader);
  return statusColumn;
}
