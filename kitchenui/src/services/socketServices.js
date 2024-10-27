import socketIOClient from "socket.io-client";


export let socket = socketIOClient.connect("http://localhost:4000", {
    secure: false,
    path: "/twentyonesocket",
});