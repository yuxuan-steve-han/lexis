import io from 'socket.io-client';
import React from 'react';
import env from "react-dotenv";

export const socket = io(env.SERVER_URL, {
    query: {
        id: sessionStorage.getItem('id')
    }
});

export const SocketContext = React.createContext(socket);