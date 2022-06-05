import io from 'socket.io-client';
import React from 'react';

export const socket = io('http://localhost:3001', {
    query: {
        id: sessionStorage.getItem('id')
    }
});

export const SocketContext = React.createContext(socket);