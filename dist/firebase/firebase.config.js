"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8mo4O6dzElkVvclpoct0G2DoQpkI-LDI",
    authDomain: "websocket-1d864.firebaseapp.com",
    projectId: "websocket-1d864",
    storageBucket: "websocket-1d864.firebasestorage.app",
    messagingSenderId: "307445021703",
    appId: "1:307445021703:web:ead6008a0403d5d1e5bea2"
};
// Initialize Firebase
const firebase_app = (0, app_1.initializeApp)(firebaseConfig);
exports.default = firebase_app;
