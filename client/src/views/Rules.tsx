import React from 'react'
import { Heading } from '@chakra-ui/react'
import {HStack,Stack} from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";




type Props = {}

const Rules = (props: Props) => {
  return (
    <div>
        <Container height='100vh' width="85vw" maxW={'unset'} backgroundColor='#4d5080' centerContent position={'relative'}>
            <Box border="10px groove black" borderRadius={"10px"} padding="20px" backgroundColor={"#292c59"}> 
                <Heading as="h1" size="4xl" color="white" textAlign="center" fontWeight={'bold'} fontFamily="Montserrat" >
                    Rules
                </Heading>
            </Box>
            <Box backgroundColor={"#3d414a"} width="50vw" height="100vh" border="8px solid white" borderRadius={"10px"} display="inline" justifyContent={"center"} >
                <HStack spacing={1} justifyContent="center" padding="20px">
                    <Box>
                        <Heading as="h1" size="lg" color="white" fontWeight={'bold'} fontFamily="Montserrat">
                            1.
                        </Heading>
                        <Heading as="h2" size="md" color="white" fontWeight={'normal'} fontFamily="Montserrat" padding="30px" verticalAlign={"text-top"}>
                            Enter your username / Create a Lobby 
                        </Heading>
                        <Heading as="h1" size="lg" color="white" fontWeight={'bold'} fontFamily="Montserrat" padding="30px" verticalAlign={"text-top"}>
                            2.
                        </Heading>
                        <Heading as="h2" size="md" color="white" fontWeight={'normal'} fontFamily="Montserrat" padding="30px" verticalAlign={"text-top"}>
                            Wait for other players to join
                        </Heading>
                        <Heading as="h1" size="lg" color="white" fontWeight={'bold'} fontFamily="Montserrat" padding="30px" verticalAlign={"text-top"}>
                            3.
                        </Heading>
                        <Heading as="h2" size="md" color="white" fontWeight={'normal'} fontFamily="Montserrat" padding="30px" verticalAlign={"text-top"}>
                            Play the game
                        </Heading>
                        

                    </Box>
                </HStack>
            </Box>
        </Container>

    </div>
  )
}


export default Rules; 
