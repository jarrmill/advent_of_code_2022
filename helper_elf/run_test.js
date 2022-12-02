const check = function (msg, expected, actual) {
  if (typeof expected === 'object') {
    if (typeof expected !== typeof actual) throw new Error(`${msg}: \n\tExpected: ${expected} \n\tActual: ${actual}`);
    if (Object.keys(expected).length !== Object.keys(actual).length) throw new Error(`${msg}: \n\tExpected: ${expected} \n\tActual: ${actual}`);
    Object.keys(actual).forEach(key => {
      check(msg, expected[key], actual[key]);
    })
  } else if (expected === actual) {
    console.log(`${msg}: Passed!`);
  } else {
    throw new Error(`${msg}: \n\tExpected: ${expected} \n\tActual: ${actual}`);
  }
}

module.exports = check;
