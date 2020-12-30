// Nodejs encryption with CTR 
const crypto = require('crypto'); 

const algorithm = require('./contact_details/encryption.json').algo;
const Key = require('./contact_details/encryption.json').key;
const encryptedmailID = JSON.parse(String(process.env.encryptedmailID));
const encryptedmailPass = JSON.parse(String(process.env.encryptedmailID));

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, Key, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
};

var mailID = decrypt(encryptedmailID);
var mailPass = decrypt(encryptedmailPass);
module.exports = {
    mailID: mailID,
    mailPass: mailPass
};
