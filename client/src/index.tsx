import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { SocketContext, socket } from './context/socket';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import customTheme from './views/components/customTheme';
import './index.css';

// pages
import Login from './views/Login';
import Create from './views/Create_Session/Create';
import Podium from './views/Podium';
import WaitingPage from './views/Waiting_Page/WaitingPage';
import JoinLobby from './views/JoinLobby';
import Play from './views/Play/Play';
import Rules from './views/Rules';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider theme={customTheme}>
    <SocketContext.Provider value={socket}>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode}  />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/winners/:id" element={<Podium/>}/>
          <Route path="/waiting/:id" element={<WaitingPage/>}/>
          <Route path="/join" element={<JoinLobby/>}/>
          <Route path="/play/:id" element={<Play/>}/>
          <Route path="/rules" element={<Rules/>}/>
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
