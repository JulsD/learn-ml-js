import { SLR } from 'ml-regression';
import csv from 'csvtojson';
import readline from 'readline';
const csvFilePath = './data/Advertising.csv';

let csvData = [],
    inputs = [],
    outputs = [];

let regression;

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

csv()
.fromFile(csvFilePath)
.then((jsonArr) => {
    csvData = csvData.concat(jsonArr);
    dressData();
    performRegression();
})

function dressData() {
    csvData.forEach((row) => {
        inputs.push(parseFloat(row.radio));
        outputs.push(parseFloat(row.sales));
    })
}

function performRegression() {
    regression = new SLR(inputs, outputs);
    console.log(regression.toString(3));
    predictOutput();
}

function predictOutput() {
    rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y =  ${regression.predict(parseFloat(answer))}`);
        predictOutput();
    });
}