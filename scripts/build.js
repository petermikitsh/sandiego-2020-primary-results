const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');
const { Readable } = require('stream');
const readline = require('readline');

const convertCSVToJson = basefileName => {
  const csvFilePath = path.resolve(__dirname, `../data/${basefileName}.csv`);
  const csvStream = fs.createReadStream(csvFilePath);
  const transformStream = new Readable();
  transformStream._read = () => {};
  const writeStream = fs.createWriteStream(
    path.resolve(__dirname, `../data/${basefileName}.json`),
  );

  var rd = readline.createInterface({
    input: csvStream,
  });

  rd.on('line', line => {
    if (line.indexOf('Unofficial Results') === 0) {
      return;
    }
    transformStream.push(`${line}\n`);
  });

  rd.on('close', () => {
    transformStream.push(null);
  });

  csv({ ignoreEmpty: true, downstreamFormat: 'array' })
    .fromStream(transformStream)
    .pipe(writeStream);
};

['contests_8', 'precincts_8'].map(convertCSVToJson);
