var CryptoJS = require("crypto-js");

function encryptMessage(data, key){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return ciphertext;
}   

function decryptMessage(ciphertext, key){
    var bytes = CryptoJS.AES.decrypt(ciphertext, key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}

module.exports = {encryptMessage, decryptMessage}