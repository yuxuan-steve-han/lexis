
import { Heading } from '@chakra-ui/react'
import {HStack,Stack} from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react'
import Confetti from 'react-confetti'
import { useState, useContext, useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";

type Props ={
    first?: string;
    second?: string;
    third?: string;
    score?: number;

}  

const Podium = (props: Props) => {
    const navigate = useNavigate();
    const redirect = () => navigate("/")
    const [toggle, setToggle] = useState(true)
    const [podium, setPodium] = useState([] as string[])
    const socket = useContext(SocketContext);
    let { id } = useParams();

    // setToggle(<Confetti/>)
    setTimeout(()=>{
        setToggle(false);
    }, 5000)

    useEffect(() => {
        socket.emit('askPlayerList', id);

        socket.on('setPlayerList', (players: any) => {
            //get top 3 players based on score
            const sortedPlayers = players.sort((a: any, b: any) => b.score - a.score)
            const top3 = sortedPlayers.slice(0, 3)
            setPodium(top3.map((player: any) => player.name))
        });
    }, [])

    return (
      <Container height='29vh' width="90vw" maxW={'unset'} backgroundColor='#4d5080' centerContent position={'relative'}>
            <Box display={toggle ? 'block' : 'none'}>
                <Confetti run={toggle}/>
            </Box>
            <Box my='20px' backgroundColor="Black" width={"90vw"} height={"12.5%"} justifyContent={"center"} alignContent="center" border={"5px outset #bab516"}>
                <Heading as="h1" size="4xl" color="white" mb={4} fontWeight='500' textAlign="center" fontFamily='Montserrat' padding="20px">
                    Podium
                </Heading>
            </Box>
            <Stack spacing={4} direction="row" align="center">
                <Button onClick={redirect} variant='solid' top={"50px"}>
                    Play again
                </Button>
            </Stack>
       

            <HStack position='absolute' bottom='25' height='100%'  spacing='100px' justify="center" display="flex" align="center">
                <Box position='absolute' px="20px" bottom='0'>
                    <Heading as="h3" size="2xl" textAlign="center" color='white'>
                        {podium[0]}
                    </Heading>
                    <Box bg='#F6AE2D' h="500px" w='250px' color='white' border="5px solid #FFD700" borderRadius="20px" padding="10px" >
              
                        <img src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png" alt='1st'
                        style={{width: "auto", height: "auto", display:"block", marginLeft: "auto", marginRight: "auto"}}/>
                    </Box>
                </Box>
                <Box position='absolute' left="100" bottom='0'>
                    <Heading as="h3" size="2xl" textAlign="center" color='white'>
                        {podium[1]}
                    </Heading>
                    <Box bg='#CAD5CA' h="400px" w='250px'  color='white' border="5px solid silver" borderRadius="20px" padding="10px">
                       
                        <img src="https://cdn-icons-png.flaticon.com/512/2583/2583319.png" alt='2nd'
                        style={{width: "175px", height: "175px", display:"block", marginLeft: "auto", marginRight: "auto"}} />

                    </Box>
                </Box>
                <Box position='absolute' right="200" bottom='0' >
                    <Heading as="h3" size="2xl" textAlign="center" color='white'>
                        {podium[2]}
                    </Heading>
                    <Box bg='#C08552' h="300px" w='250px'  color='white' border="5px solid #CD7F32" borderRadius="20px" padding="10px">
                        <img src="https://cdn-icons-png.flaticon.com/512/2583/2583434.png" alt="3rd" 
                        style={{width: "150px", height: "150px", display:"block", marginLeft: "auto", marginRight: "auto"}} />
                    </Box>
                </Box>
            </HStack>
    </Container>
  )
}




export default Podium; 
