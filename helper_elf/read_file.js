const fs = require('fs');
const path = require('path');
const read_file = function (fileName) {
  const pathname = path.join(__dirname, '../fixtures', fileName);
  return new Promise((resolve, reject) => {
    fs.readFile(pathname, 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = read_file;
