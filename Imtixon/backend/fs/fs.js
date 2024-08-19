const fs = require('fs');
const { v4 } = require('uuid');

function reader_files(fileName) {
    fileName.trim();
    fileName.toLowerCase();
    const file = fs.readFileSync(`./base/` + fileName + '.json');
    return JSON.parse(file);
}

function Headers(res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Enable CORS
}

function writer_files(fileName, data) {
    fileName.trim();
    fileName.toLowerCase();
    fs.writeFileSync(`./base/` + fileName + '.json', JSON.stringify(data, null, 4))
}


module.exports = { reader_files, writer_files, Headers }