
import XLSX from "xlsx-js-style";

import {
  rowsGenTransactions,
  xlsxParsedDataGenTransactions,
  footerDataGenTransactions,
  xlsxParsedFooterDataGenTransactions,
  calculateWSColsTransactions,
  dataColumnsTransactions
} from "./data.js";

const ABC = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// Styles
const Fill1 = {
  fill: {
    fgColor: { rgb: "FFBFBFBF" },
  },
  font: {
    bold: true
  }
};

const Fill2 = {
  fill: {
    fgColor: { rgb: "FFDBDBDB" },
  },
};

const BorderFirst2 = {
  border: {
    top: {
      style: "thin"
    },
    bottom: {
      style: "thin",
    },
    left: {
      style: "thin"
    },
    right: {
      style: "thin"
    }
  }
};

const BorderRestAll = {
  border: {
    top: {
      style: "dotted"
    },
    bottom: {
      style: "dotted",
    },
    left: {
      style: "thin"
    },
    right: {
      style: "thin"
    }
  }
};

const exportXLSXTransactions = (data) => {

  const rows = rowsGenTransactions(data);

  let xlsxParsedData = [];
  const xlsxParsedBodyData = xlsxParsedDataGenTransactions(rows);
  const footerDataFloatsArr = footerDataGenTransactions(data);
  const xlsxParsedFooterData = xlsxParsedFooterDataGenTransactions(
    footerDataFloatsArr
  );

  xlsxParsedData = xlsxParsedData.concat(xlsxParsedBodyData);
  xlsxParsedData = xlsxParsedData.concat(xlsxParsedFooterData);

  const ws = XLSX.utils.json_to_sheet(xlsxParsedData);

  // Set column widths
  const wscols = calculateWSColsTransactions(xlsxParsedData);
  ws['!cols'] = wscols

  let cursor = 1;
  let stopAt;

  // Header row style
  applyRowStyle(ws, cursor, {...Fill1, ...BorderFirst2} ); 
  cursor = cursor + 1;

  // Apply styling to body
  stopAt = rows.length + cursor;
  for( let i = cursor; i < stopAt; i++ ){
    applyRowStyle(ws, i, BorderRestAll);
    cursor = cursor + 1;
  }

  // Apply styling to footer
  applyRowStyle(ws, cursor, {...Fill2, ...BorderFirst2} ); 

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  XLSX.writeFile(wb, `${"C Holder" ?? "N/A"} - ${Date.now()} - Transactions.xlsx`);
};

function applyRowStyle(ws, RowNum, style){
  for( let i = 0; i < dataColumnsTransactions.length; i++ ){
    let char = ABC[i];
    ws[`${char}${RowNum}`].s = style;
  }
}

export {
  exportXLSXTransactions
}

