const request = require('request');
var baseRate = 'AUD';

const amountToOther = () => {
  return new Promise((resolve, reject) => {
    return request.get(`http://api.fixer.io/latest?base=${baseRate}`, (err, res, body) => {
      if (err) return reject(err);
      const data = JSON.parse(body);
      const result = data.rates['USD'];
      return resolve(result);
    });
  });
};

module.exports = amountToOther;
