const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

export default function encrypt (buffer, key) {
    //CREATE AN INITIALIZATION VECTOR
    let ket = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0,32);
    const iv = crypto.randomBytes(16);

    //CREATE A NEW CIPHER USING THE ALGORITHM, KEY, IV
    const cipher = crypto.createCipheriv(algorithm, ket, iv);
    //CREATE THE NEW ENCRYPTED BUFFER
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
}