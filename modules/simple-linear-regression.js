// ========== SLR - simple linear regression ==========
import csv from 'csvtojson';
import { SLR } from 'ml-regression';
import readline from 'readline';
const slrFilePath = './data/Advertising.csv';

let slrData = [],
slrInputs = [],
slrOutputs = [];

let regression;

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

csv()
.fromFile(slrFilePath)
.then((jsonArr) => {
    slrData = slrData.concat(jsonArr);
    dressSlrData();
    performRegression();
})

function dressSlrData() {
    slrData.forEach((row) => {
        slrInputs.push(parseFloat(row.radio));
        slrOutputs.push(parseFloat(row.sales));
    })
}

function performRegression() {
    regression = new SLR(slrInputs, slrOutputs);
    console.log(regression.toString(3));
    predictOutput();
}

function predictOutput() {
    rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y =  ${regression.predict(parseFloat(answer))}`);
    });
}