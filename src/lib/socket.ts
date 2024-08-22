import { io, Socket } from "socket.io-client";

const token = localStorage.getItem('AUTH_TOKEN');
const socket: Socket = io(import.meta.env.VITE_SOCKET_SERVER, {
    transports: ['websocket', 'polling'],
    auth: {
        headers: {
            Authorization: `Bearer ${token}`
        }
    },
});

export default socket;