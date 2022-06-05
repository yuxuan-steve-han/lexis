import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Container, Button, Grid, Text, GridItem, Box } from '@chakra-ui/react';
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
        </Grid>
      </Container>
    </Container>   
    </Box>
  )
}

export default Login