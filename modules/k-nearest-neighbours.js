// ========== KNN - k-Nearest-Neighbours ==========
import csv from 'csvtojson';
import KNN from 'ml-knn';
import prompt from 'prompt';

const knnFilePath = './data/iris.csv';
const names = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'type'];
let seperationSize,
    typesArray = [];

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

    typesArray = [...types];

    knnData.forEach((row) => {
        let rowArray, typeNumber;

        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0, 4);

        typeNumber = typesArray.indexOf(row.type); 

        knnInputs.push(rowArray);
        knnOutputs.push(typeNumber);
    });

    trainingSetX = knnInputs.slice(0, seperationSize);
    trainingSetY = knnOutputs.slice(0, seperationSize);
    testSetX = knnInputs.slice(seperationSize);
    testSetY = knnOutputs.slice(seperationSize);

    console.log("seperationSize: ", seperationSize);
    console.log("knnInputs: ", knnInputs);
    console.log("testSetX1: ", testSetX);

    train();
}

function train() {
    knn = new KNN(trainingSetX, trainingSetY, {k: 7});
    test();
}

function test() {
    console.log("testSetX2: ", testSetX)
    const result = knn.predict(testSetX);
    const testSetLength = testSetX.length;
    const predictionError = error(result, testSetY);
    console.log(`Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`);
    predict();
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

function predict() {
    let temp = [];
    prompt.start();
    
    prompt.get(['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'], function (err, result) {
        if (!err) {
            for (var key in result) {
                temp.push(parseFloat(result[key]));
            }
            console.log(`With ${temp} -- type =  ${typesArray[knn.predict(temp)]}`);
        }
    });
}