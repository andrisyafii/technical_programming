import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

// Cara paling sederhana untuk inisialisasi Firebase Admin SDK tanpa konfigurasi kredensial 
// (akan menggunakan Application Default Credentials)
admin.initializeApp();

export const db = admin.firestore();
export default admin;