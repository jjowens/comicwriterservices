const fs = require('fs');
const reader = require('xlsx');

const jsonFileName = "./datasource/data.json";
const file = reader.readFile("./datasource/Comic Writer Services.xlsx");

let linkObjs = [];
let data = [];

const sheets = file.SheetNames;

console.table(sheets);

for(let i = 0; i < sheets.length; i++) 
{ 
   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
        
   temp.forEach((res) => { 
      data.push(res) 
   })

   linkObjs.push(temp);
} 

console.table(data);

fs.writeFile(jsonFileName, console.table(data), function (err) {
    if (err) return console.log(err);
    console.log('Completed Excel to JSON > data.json');
  });
