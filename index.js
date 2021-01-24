const fs = require('fs');

let rawdata = fs.readFileSync('websites.json');
let websites = JSON.parse(rawdata);

const https = require('https');


websites["websites"].forEach(element => {
    // make get request

    // get content and hash it

    // store hash on websites json entry
});