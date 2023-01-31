import CryptoJS from "crypto-js";
//const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

export default function decrypt(encrypted, key){
    // let ket = CryptoJS.createHash('sha256').update(String(key)).digest('base64').substr(0,32);
    // CryptoJS.AES.decrypt
    // //GET THE IV : THE FIRST 16 BYTES
    // const iv = encrypted.slice(0,16);

    // //GET  THE REST
    // encrypted = encrypted.slice(16);

    // //CREATE DECIPHER
    // const decipher = crypto.createDecipheriv(algorithm, ket, iv);

    // //DECRYPT IT
    // const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    // return result;
    return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
}