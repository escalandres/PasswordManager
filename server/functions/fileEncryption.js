const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

const encrypt = (buffer, key) => {
    //CREATE AN INITIALIZATION VECTOR
    let ket = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0,32);
    const iv = crypto.randomBytes(16);

    //CREATE A NEW CIPHER USING THE ALGORITHM, KEY, IV
    const cipher = crypto.createCipheriv(algorithm, ket, iv);
    //CREATE THE NEW ENCRYPTED BUFFER
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
}

const decrypt = (encrypted, key) =>{
    let ket = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0,32);

    //GET THE IV : THE FIRST 16 BYTES
    const iv = encrypted.slice(0,16);

    //GET  THE REST
    encrypted = encrypted.slice(16);

    //CREATE DECIPHER
    const decipher = crypto.createDecipheriv(algorithm, ket, iv);

    //DECRYPT IT
    const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return result;
}

module.exports = {encrypt, decrypt}