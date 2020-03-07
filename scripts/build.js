const path = require('path');
const csv = require('csvtojson');
const fs = require('fs');
const { Readable, Transform } = require('stream');
const readline = require('readline');

const lineToArray = new Transform({
  transform(chunk, encoding, cb) {
    this.push(
      (this.notFirst ? ',' : '[') + chunk.toString('utf-8').slice(0, -1),
    );
    this.notFirst = true;
    cb();
  },
  flush(cb) {
    this.push(!this.notFirst ? '[]' : ']');
    cb();
  },
});

const convertCSVToJson = basefileName => {
  const csvFilePath = path.resolve(__dirname, `../data/${basefileName}.csv`);
  const csvStream = fs.createReadStream(csvFilePath);
  const sanitizedStream = new Readable();
  sanitizedStream._read = () => {};
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
    sanitizedStream.push(`${line}\n`);
  });

  rd.on('close', () => {
    sanitizedStream.push(null);
  });

  sanitizedStream
    .pipe(csv({ ignoreEmpty: true, downstreamFormat: 'line' }))
    .pipe(lineToArray)
    .pipe(writeStream);
};

['contests_8', 'precincts_8'].map(convertCSVToJson);
