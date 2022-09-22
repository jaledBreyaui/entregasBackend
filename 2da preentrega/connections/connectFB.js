const { query } = require("express");
var admin = require("firebase-admin");

var serviceAccount = require("../nodejs-b592d-firebase-adminsdk-ekm6u-fe6d5a2d23.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log("Firestore conectado");