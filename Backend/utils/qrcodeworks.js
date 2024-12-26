// Import the necessary libraries
import crypto from 'crypto';
import QRCode from 'qrcode';

export const generateQRCode = async (jsonData) => {
    try {
        const secretKey = process.env.AES_SECRET;
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'utf-8'), iv);
        let encryptedData = cipher.update(JSON.stringify(jsonData), 'utf8', 'hex');
        encryptedData += cipher.final('hex');

        const encryptedPayload = iv.toString('hex') + ':' + encryptedData;

        const svg = await QRCode.toString(encryptedPayload, { type: 'svg' });

        return svg;
    } catch (error) {
        console.error('Error generating QR code:', error.message);
    }
};

export const decryptEncryptedPayload = (encryptedPayload) => {
    return new Promise((resolve, reject) => {
        const secretKey = process.env.AES_SECRET;
        // Split the encryptedPayload to get the IV and the encrypted data
        const [ivHex, encryptedData] = encryptedPayload.split(':');
        // Convert IV from hex string to Buffer
        const iv = Buffer.from(ivHex, 'hex');
        const encryptedBuffer = Buffer.from(encryptedData, 'hex');

        // Create a decipher using the same algorithm, secret key, and IV
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'utf-8'), iv);

        // Decrypt the data
        let decryptedData = decipher.update(encryptedBuffer, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');

        // Parse the decrypted JSON string back into an object
        const jsonData = JSON.parse(decryptedData);

        resolve(jsonData);
    })
}
