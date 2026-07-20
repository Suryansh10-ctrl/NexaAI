import {io}  from "socket.io-client"

export const initialzeSocketConnection = () => {
    const socket = io("https://nexaai-mb5t.onrender.com", {
        withCredentials: true,
    })

    socket.on("connect", () => {
        console.log("connected to Socket.io server")
    })

}