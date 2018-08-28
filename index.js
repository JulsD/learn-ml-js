import csv from 'csvtojson';

// ========== SLR - simple linear regression ==========
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


// ========== KNN - k-Nearest-Neighbours ==========
import KNN from 'ml-knn';

const knnFilePath = './data/iris.csv';
const names = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'type'];
let seperationSize;

let knnData = [],
    knnInputs = [],
    knnOutputs = [];

let trainingSetX = [],
    trainingSetY = [],
    testSetX = [],
    testSetY = [];

let knn;

csv({noheader: true, headers: names})
.fromFile(knnFilePath)
.then((jsonArr) => {
    knnData = knnData.concat(jsonArr);
    seperationSize = 0.7 * knnData.length;
    knnData = shuffleArray(knnData);
    dressKnnData();
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function dressKnnData() {
    let types = new Set();
    knnData.forEach((row) => {
        types.add(row.type);
    });

    let typesArray = [...types];

    knnData.forEach((row) => {
        let rowArray, typeNumber;

        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0, 4);

        typeNumber = typesArray.indexOf(row.type); 

        knnInputs.push(rowArray);
        knnOutputs.push(typeNumber);

        trainingSetX = knnInputs.slice(0, seperationSize);
        trainingSetY = knnOutputs.slice(0, seperationSize);
        testSetX = knnInputs.slice(seperationSize);
        testSetY = knnOutputs.slice(seperationSize);

        train();
    });
}

function train() {
    knn = new KNN(trainingSetX, trainingSetY, {k: 7});
    test();
}

function test() {
    const result = knn.predict(testSetX);
    const testSetLength = testSetX.length;
    const predictionError = error(result, testSetY);
    console.log(`Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`);
    // predict();
}

function error(predicted, expected) {
    let misclassifications = 0;
    for (var index = 0; index < predicted.length; index++) {
        if (predicted[index] !== expected[index]) {
            misclassifications++;
        }
    }
    return misclassifications;
}