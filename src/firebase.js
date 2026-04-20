// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyC3BSaH6KT3s6dHKV-ZmA-uX_rd1KKJLJE",        
//   authDomain: "real-es-f854c.firebaseapp.com",
//   projectId: "real-es-f854c",
//   storageBucket: "real-es-f854c.appspot.com",
//   messagingSenderId: "xxxxxxxxxxxx",
//   appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxxxxx"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const db = initializeFirestore(app, {
//   experimentalAutoDetectLongPolling: true,
//   localCache: persistentLocalCache({
//     tabManager: persistentMultipleTabManager() 
//   }),
// });

// console.log("✅ Firebase initialized - Project:", firebaseConfig.projectId);

// export { auth, db };
// server/services/firebase.js
const admin = require("firebase-admin");
const path  = require("path");

if (!admin.apps.length) {
  const serviceAccount = require(path.join(__dirname, "../serviceAccountKey.json"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

module.exports = { admin, db };