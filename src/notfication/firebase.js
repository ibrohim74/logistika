// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging , getToken} from "firebase/messaging"
const firebaseConfig = {
    apiKey: "AIzaSyDeIEPtY0Gvm82PU3pAtS657IayNRi0xk0",
    authDomain: "logistika-741fe.firebaseapp.com",
    projectId: "logistika-741fe",
    storageBucket: "logistika-741fe.appspot.com",
    messagingSenderId: "1078879511736",
    appId: "1:1078879511736:web:eea5143be6fb8b9d2d804d",
    measurementId: "G-KTPHXW54Q5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)

export const generateToken = async ()=>{
  const permission=  await Notification.requestPermission()
    console.log(permission)
    if (permission === "granted"){
        const token = await getToken(messaging , {
            vapidKey:"BCH8dE1wkx0fFQ9HQ_S5UHP-d8dAUkrrOUTDPHoe5QM4rJyiKZYEXekJOPjtmiL0cfYlBD7M_zSw-a2EkIVZk9U"
        })
        console.log(token)
    }


}