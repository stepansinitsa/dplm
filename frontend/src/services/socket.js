import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_WS_URL, {
  withCredentials: true,
});

export default socket;