import admin from 'firebase-admin';

var serviceAccount = require("../wake-me-up-f7bec-firebase-adminsdk-cmtlg-6ef485235e.json");
// Initialize Firebase
class FirebasManager {
    constructor() {
        console.log("Initializing firebase server...")
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://wake-me-up-f7bec.firebaseio.com"
        });
        this.db = admin.firestore();
        this.realtimeDb = admin.database();
    }

    turnOn(){
        console.log("Turning on the device...");
        var ref = this.realtimeDb.ref("casa14/node1");
        ref.child('value1').set("ON");
    }

    turnOff(){
        console.log("Turning off the device...");
        var ref = this.realtimeDb.ref("casa14/node1");
        ref.child('value1').set("OFF");
    }

    createListener(callback) {
        this.db.collection("devices").doc("JlAtXf52v7WpxwCMSAfY")
            .onSnapshot(function (doc) {
                callback(doc);
            });
    }

    changeToPlayMusic(){
        this.db.collection("devices").doc("JlAtXf52v7WpxwCMSAfY").set({
            status: "play",
            lastModification: new Date()
        })
    }
}

export default FirebasManager;