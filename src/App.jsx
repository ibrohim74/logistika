import RouterIndex from "./utils/RouterIndex.jsx";
import {useEffect} from "react";
import {generateToken, messaging} from "./notfication/firebase.js";
import {onMessage} from "firebase/messaging"
import {notification} from "antd"
function App() {

    useEffect(() => {
        generateToken()
        onMessage(messaging , (payload)=>{
            notification.open({
                message: payload.notification.title,
                description: payload.notification.body,
            })
        })
    }, [])

    return (
        <>


            <RouterIndex/>
        </>


    )
}

export default App
