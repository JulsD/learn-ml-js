import ml from 'ml-regression';
import csv from 'csvtojson';
const SLR = ml.SLR;
const csvFilePath = 'data/Advertising.csv';

let csvData = [],
    x = [],
    y = [];

let regressionModel;

csv()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        csvData.push(jsonObj);
    })
    .on('done', () => {
        console.log('data reseived');
    })

