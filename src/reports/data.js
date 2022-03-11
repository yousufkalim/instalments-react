
function rowsGenTransactions(data){

  const arr = [];

  for( let i = 0; i < data.length; i++ ){

    const _arr = [];

    _arr.push(`${i+1}`);
    _arr.push(data[i].amount ?? "");
    _arr.push(data[i].createdAt ?? "");

    arr.push(_arr);

  }

  return arr;

}

function xlsxParsedDataGenTransactions(rows){

  const xlsxParsedData = [];

  // Populate body data in xlsxParsedData
  for( let i = 0; i < rows.length; i++ ){
    let obj = {};
    for( let j = 0; j < dataColumnsTransactions.length; j++ ){
      obj[dataColumnsTransactions[j]] = rows[i][j];
    }
    xlsxParsedData.push(obj);
  }

  return xlsxParsedData;

}

function footerDataGenTransactions(data){

  let footerData = [];

  let _credit = 0;
  for( let i = 0; i < data.length; i++ ){
    _credit = _credit + data[i].amount;
  }

  footerData = [
    _credit,
  ];

  return footerData;

}

function xlsxParsedFooterDataGenTransactions(
  floatsRow
){

  const xlsxParsedData = [];

  for(let i = 0; i < footerColumnsTransactions.length; i++){
    const obj = {};
    for(let j = 0; j < dataColumnsTransactions.length; j++){
      if(j == 0){
        obj[dataColumnsTransactions[j]] = footerColumnsTransactions[i];
      } else if( j == 2 ) {
        obj[dataColumnsTransactions[j]] = floatsRow[i];
      } else {
        obj[dataColumnsTransactions[j]] = "";
      }
    }
    xlsxParsedData.push(obj);
  }
  
  return xlsxParsedData;

}

function calculateWSColsTransactions(arr){
  let createdAtL = null;
  for(let i = 0; i < arr.length; i++){
    const currentObj = arr[i];
    const values = Object.values(currentObj);
    if(values[2].length > createdAtL){
      createdAtL = values[2].length
    }
  }

  const wscols = [
    {wch:10},
    {wch:10},
    {wch:createdAtL}
  ];

  return wscols;
}

const dataColumnsTransactions = [
  "No #",
  "Amount",
  "Created at",
];

const footerColumnsTransactions = [
  "Credit",
];

export {
  rowsGenTransactions,
  xlsxParsedDataGenTransactions,
  footerDataGenTransactions,
  xlsxParsedFooterDataGenTransactions,
  calculateWSColsTransactions,
  dataColumnsTransactions,
  footerColumnsTransactions,
}