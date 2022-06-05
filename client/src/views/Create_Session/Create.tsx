import { Textarea, Container, Heading, Box, Button } from '@chakra-ui/react'
import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../context/socket";
import { useNavigate } from "react-router-dom";

type Props = {}

const Create = (props: Props) => {
  const [text, setText] = useState('')
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleCreateLobby = () => {
    let words = text.split('\n').filter(word => word.length > 0);
    if (words.length > 0) {
      socket.emit('createLobby', words);
    }
  }

  useEffect(() => {
    socket.on('lobbyCreated', (lobbyID: string) => {
      navigate('/waiting/' + lobbyID);
    })
  }, [])


  return (
    <Box w='100%' h='100%'>
    <Container
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDir={'column'}

    height='100vh'
    >   
      <Box width='md' bg='white' p='10' borderRadius='15'>
          <Heading as='h3' my='1' ml='1' textAlign={'left'} fontWeight='400'>Start a session...</Heading>
          <Textarea placeholder='Enter a list' h='200px' borderWidth={2} size='lg' _placeholder={{ color: '#575366' }} bg='white' value={text} onChange={(e) => {
            if(/^[a-zA-Z\r\n]*$/.test(e.target.value)){
              setText(e.target.value)
            }
          }}/>
          <Button colorScheme={'messenger'} float='right' my='2' px='5' onClick={() => {handleCreateLobby()}}>Next</Button>
      </Box>
    </Container>    
    </Box>
  )
}

export default Create;