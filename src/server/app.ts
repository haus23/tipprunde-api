import { cert, getApps, initializeApp } from 'firebase-admin/app';

const apps = getApps();

export const app =
  apps.length > 0
    ? apps[0]
    : initializeApp({
        credential: cert({
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
          projectId: process.env.FIREBASE_PROJECT_ID,
        }),
      });
