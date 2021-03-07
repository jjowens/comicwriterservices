
const { table } = require('console');
const fs = require('fs');
const xlsxFile = require('read-excel-file/node');

const jsonFile = "./datasource/data.json";

const jsonData = [];


xlsxFile('./datasource/Comic Writer Services.xlsx', { getSheets: true }).then((sheets) => {
    sheets.forEach((obj)=>{
        console.log(obj.name);

        let categoryObj = [];

        categoryObj.category = obj.name;

        console.log(obj.name);

        let linkObjs = [];

        jsonData.push(categoryObj);
    });

    console.log(sheets[0]);
}).then((rows) => {
    console.log(rows);
});