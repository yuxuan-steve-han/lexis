import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Container, Button, Grid, Text, GridItem, Box, Center} from '@chakra-ui/react';
import { SocketContext } from "../context/socket";


const Login = () => {
  const [username, setUsername] = useState('');
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const submitName = () => {
    if (username.length > 10 || username.length < 1) {
      alert("Username must be between 1 and 10 characters");
      return false;
    }
    socket.emit('setName', username);
    return true;
  }
  


  return (
    <Box w='100%' h='100%'>
        <Center overflow={'hidden'} position='absolute' w='100%' top='100px' display='flex' flexDirection={'column'}>
          <img src="https://media.discordapp.net/attachments/978839419211616276/982851150661439559/Lexis-removebg-preview.png" width={"400px"} height="50px" alt="logo"/>
          <Text fontWeight={"bold"} color="white" fontFamily="Montserrat" fontSize={"20px"} my="2.5"> 
            The Educational Word Game!
          </Text>
        </Center>
    <Container
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDir={'column'}
        height='100vh'
      >
      <Container w={'sm'} bg='white' p='10' borderRadius='10'>
      <Text my='1' textAlign={'left'}> Ready to Play? </Text>
        <Input placeholder='Username' value={username} _placeholder={{ color: '#575366' }} bg='white' borderWidth={2} onChange={(e) => {setUsername(e.target.value)}} size={'lg'}/>
        <Grid mt='2' templateColumns='1fr 1fr' gap='1'>
          <GridItem >
          <Button colorScheme={'messenger'} w='100%' onClick={() => {
            if(submitName()) navigate('/join');
          }}>Join</Button>
          </GridItem>
          <GridItem>
          <Button colorScheme={'messenger'} w='100%' onClick={() => {
            if(submitName()) navigate('/create');
          }}>Create</Button>
          </GridItem>
          <Text onClick={() => navigate('/rules')} as='a' href="javascript:;" color={'teal'} > Read the Rules </Text>
        </Grid>

      </Container>
    </Container>   
    </Box>
  )
}

export default Login