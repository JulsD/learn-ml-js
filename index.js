import { SLR } from 'ml-regression';
import csv from 'csvtojson';
const csvFilePath = 'data/Advertising.csv';

let csvData = [],
    inputs = [],
    outputs = [];

let regression;

csv()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        csvData.push(jsonObj);
    })
    .on('done', () => {
        dressData();
        performRegression();
    })

function dressData() {
    csvData.forEach((row) => {
        inputs.push(f(row.Radio));
        outputs.push(f(row.Sales));
    })
}

function f(str) {
    return parseFloat(str);
}

function performRegression() {
    regression = new SLR(inputs, outputs);
    console.log(regression.toString(3));
}