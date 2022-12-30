import { Heading } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";


type Props = {}

const Rules = (props: Props) => {
    const navigate = useNavigate();
  return (
    <div>
        <Container height='100vh' width="85vw" maxW={'unset'} backgroundColor='#4d5080' centerContent position={'relative'}>
            <Box border="10px groove black" borderRadius={"10px"} padding="20px" backgroundColor={"#292c59"}> 
                <Heading as="h1" size="4xl" color="white" textAlign="center" fontWeight={'bold'} fontFamily="Montserrat" >
                    Rules
                </Heading>
            </Box>
            <Box backgroundColor={"#3d414a"} width="max-content" m='20px' height="100vh" border="8px solid white" borderRadius={"10px"} display="inline" justifyContent={"center"} >
                <HStack spacing={1} justifyContent="center" padding="20px">
                    <Box>
                        <Heading as="h1" size="lg" color="white" fontWeight={'bold'} fontFamily="Montserrat"  verticalAlign={"text-top"}>
                            1.
                        </Heading>
                        <Heading as="h2" size="md" color="white" fontWeight={'normal'} fontFamily="Montserrat" padding="30px" verticalAlign={"text-top"}>
                            Enter your username / create a Lobby.
                        </Heading>
                        <Heading as="h1" size="lg" color="white" fontWeight={'bold'} fontFamily="Montserrat" verticalAlign={"text-top"}>
                            2. 
                        </Heading>
                        <Heading as="h2" size="md" color="white" fontWeight={'normal'} fontFamily="Montserrat" padding="30px" verticalAlign={"text-top"}>
                            Wait for other players to join.
                        </Heading>
                        <Heading as="h1" size="lg" color="white" fontWeight={'bold'} fontFamily="Montserrat" verticalAlign={"text-top"}>
                            3.
                        </Heading>
                        <Heading as="h2" size="md" color="white" fontWeight={'normal'} fontFamily="Montserrat" padding="30px" verticalAlign={"text-top"}>
                            Guess words by clicking the audio button to hear the word.
                        </Heading>
                        
                        

                    </Box>
                </HStack>
            </Box>
            <Box position={'absolute'} bottom={'0'} padding="30px">
                <Button onClick={() => navigate('/')} color="black" backgroundColor={"white"} variant="outline" size="lg" width="100px" height="50px" borderRadius="15px" fontFamily="Montserrat" fontWeight={'bold'} border="5px solid black">
                    Back
                </Button>
            </Box>

        </Container>



    </div>
  )
}


export default Rules; 
