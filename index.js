import ml from 'ml-regression';
import csv from 'csvtojson';
const SLR = ml.SLR;
const csvFilePath = 'data/Advertising.csv';

let csvData = [],
    x = [],
    y = [];

let regressionModel;