const print = function(value, part = 'one') {
  const text = !!value ? value : `${value}?! Learn to write better code LMAO`;
  const answer = `
   .-""-.
  /,..___)
 () {_____}
   (--O-O--)
   {'--^--'}
   {  '-'  } Santa says part ${part} is: ${text}
    {     }
     '---'
  `
  console.log(answer);
};

module.exports = print;