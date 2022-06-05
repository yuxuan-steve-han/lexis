import { 
    Box,
    Heading,
    Center,
    Square,
    HStack,
    Tag,
    TagLabel,
    Button
} from '@chakra-ui/react'
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../context/socket";

const WaitingPage = () => {
    const [players, setPlayers] = useState([] as any[]);
    const [lobbyID, setLobbyID] = useState('');
    const [isHost, setIsHost] = useState(false);
    let { id } = useParams();
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    const handleStartGame = () => {
        socket.emit('startLobby', lobbyID);
    }

    useEffect(() => {
        socket.emit('joinLobby', id);
        socket.on('lobbyJoined', (LobbyID) => {
            setLobbyID(LobbyID);
        })

        socket.on('joinFailed', () => {
            navigate('/')
        })

        socket.on('setPlayerList', (player) => {
            setPlayers(player);
        });

        socket.on('isAdmin', () => {
            setIsHost(true);
        });

        socket.on('lobbyStarted', () => {
            navigate('/play/' + id);
        });

    }, []);

    return (
        <Box h='100%'>
            <Center w='100%' h='15%' bgColor='#AE84BD'>
                <Heading as="h1" size="4xl" color="white" mb='5px' fontWeight='medium'>JOIN CODE: {lobbyID}</Heading>
            </Center>
            <Button display={isHost ? 'block' : 'none'} float='right' onClick={handleStartGame} colorScheme='messenger' size='md' m='20px'>Start Game</Button>
            <HStack spacing='30px' m='0 auto' w='500px' mt='80px' color='white' fontSize='30px'>
                <Square size='70px' bgColor='#478978' borderRadius='20px'>L</Square>
                <Square size='70px' bgColor='#478978' borderRadius='20px'>E</Square>
                <Square size='70px' bgColor='#478978' borderRadius='20px'>X</Square>
                <Square size='70px' bgColor='#478978' borderRadius='20px'>I</Square>
                <Square size='70px' bgColor='#478978' borderRadius='20px'>S</Square>
            </HStack>
            <Box w='80%' m='40px auto'>
                {players.map((current, index) => {
                    return (
                        <Tag size='lg' borderRadius='30px' bgColor='#60435F' h='50px' px='30px' fontSize='20px' color='white' m='20px' key={index}>
                            <TagLabel>{current}</TagLabel>
                        </Tag>
                    )
                })}
            </Box>
        </Box>
    )
}




export default WaitingPage; 
