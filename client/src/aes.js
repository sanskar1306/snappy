import { AES} from 'crypto-js';
var CryptoJS = require("crypto-js");
var secretKey = "uI2ooxtwHeI6q69PS98fx9SWVGbpQohO";

export const encryptMessage = (message) => {
    const encryptedMessage = AES.encrypt(message, secretKey).toString();
    return encryptedMessage;
};

export const decryptMessage = (encryptedMessage) => {

    const decryptedBytes = AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
};