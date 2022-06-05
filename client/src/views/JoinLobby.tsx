import { 
    Box,
    Center,
    Heading,
    PinInput, 
    PinInputField,
    Button
} from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";

const JoinLobby = () => {
    const [pin, setPin] = useState('');
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    const joinLobby = () => {
        navigate('/waiting/' + pin);
    }


    return (
        <Center h='100%'>
            <Box bg='white' p='20' borderRadius={15}>
                <Heading as="h1" size="xl" fontWeight='medium' textAlign='center'>Join a Lobby</Heading>
                <Center mt='20px'>
                    <PinInput size='lg' value={pin} onChange={setPin}>
                        <PinInputField mx='10px'/>
                        <PinInputField mx='10px'/>
                        <PinInputField mx='10px'/>
                        <PinInputField mx='10px'/>
                    </PinInput>
                </Center>
                <Button colorScheme='messenger' mt='20px' w='100%' size='lg' onClick={joinLobby}>Join</Button>
            </Box>
        </Center>
    )
}


export default JoinLobby; 
