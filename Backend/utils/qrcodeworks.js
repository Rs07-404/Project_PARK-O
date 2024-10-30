// Import the necessary libraries
import crypto from 'crypto';
import QRCode from 'qrcode';

const generateQRCode = async (jsonData) => {
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

export default generateQRCode;

