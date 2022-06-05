import { 
  Box,
  Square,
  HStack,
  Input,
  Button,
  IconButton,
  ButtonGroup,
  useDisclosure,
  Heading,
  Collapse, 
  Table,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { SayButton } from 'react-say';
import { FiVolume2 } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from '../../context/socket';

const Play = () => {
  const [currentWord, setCurrentWord] = React.useState('');
  const [tries, setTries] = React.useState([] as string[]);
  const { isOpen, onToggle } = useDisclosure()
  const [playerList, setPlayerList] = React.useState([] as any[]);
  const [moreWords, setMoreWords] = React.useState(true);

  let { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    let word = e.target.value.toUpperCase()
    if (e.key === 'Enter' && word.length === currentWord.length) {
      if(word === currentWord) {
        socket.emit('getNextWord', id)
        socket.emit('addScore', id, tries.length)
        setTries([])
      } else {
        setTries([...tries, word]);
      }
      e.target.value = '';
    }
  }

  const LetterBlock = (props: { letter: string, wrong: boolean }) => {
    return (
      <Square
        size='80px'
        fontSize='4xl'
        fontWeight='bold'
        borderRadius='20px'
        color='white'
        bgColor={props.wrong ? 'grey' : 'green.500'}
      >
        {props.letter}
      </Square>
    );
  }
  
  useEffect(() => {
    socket.emit('getNextWord', id);
    socket.emit('askPlayerList', id);

    socket.on('nextWord', (word: string) => {
      setCurrentWord(prev => {
        return word.toUpperCase();
      });
    });

    socket.on('setPlayerList', (player) => {
      setPlayerList(player);
    });

    socket.on('noMoreWords' , () => {
      setMoreWords(false);
      setTries([]);
    });

    socket.on('gameFinished', () => {
      navigate('/winners/' + id);
    })
  }, []);

  return (
    <>
    <Box h='100%' display='flex' flexFlow='column'>
      <Box p='20px 150px' m='0 auto' mt='150px' flex='1 1 auto' bg='white' borderRadius={10} overflowY='scroll'>
        <Box>
          {tries.map((word, index) => {
            return (
              <HStack
                key={index}
                spacing='10px'
                justify='center'
                align='center'
                mt='20px'
              >
                {word.split('').map((letter, index) => {
                  return (
                    <LetterBlock
                      key={index}
                      letter={letter}
                      wrong={letter !== currentWord[index]}
                    />
                  );
                })} 
              </HStack>
            );
          })}
          {moreWords ? <HStack
            spacing='10px'
            justify='center'
            align='center'
            mt='20px'
            >
            {[...Array(currentWord.length)].map((e, i) => {
              return (
                <LetterBlock
                  key={i}
                  letter=''
                  wrong={true}
                />
              );
            })}
          </HStack> : 
            <Heading size='xl' textAlign='center' mt='20px'>No more words! wait for others to finish</Heading>
          }
          <Collapse in={isOpen} animateOpacity unmountOnExit>
            <Box
              color='white'
              pt='10px'
              mt='30px'
              bg='teal.500'
              rounded='md'
              shadow='md'
            >
              <Heading fontSize='4xl' fontWeight='bold' textAlign='center'>Scoreboard</Heading>
              <Box h='100%' p='20px'>
                <Table variant='simple'>
                  <Tbody>
                    {playerList.map((player, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{player.name}</Td>
                          <Td isNumeric>{player.score}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Box>
      <Box flex='0 1 auto' >
        <Box w='30%' h='300px' m='0 auto' mt='40px' >
          <HStack gap='1' my='2' >
            <ButtonGroup isAttached size='lg' bg='#0078FF' color='white' px='5' borderRadius='8' _hover={{bg:'#075ec1'}}>
              <Button as={SayButton} text={currentWord} size='lg' justifyContent='flex-start'>Play Sound</Button>
              <IconButton aria-label='play sound' icon={<FiVolume2/>} justifyContent='flex-end' size='lg' bg='transparent' pointerEvents={'none'} />
            </ButtonGroup>
            <Button size='lg' justifyContent='flex-start' onClick={onToggle}>Leaderboard</Button>
          </HStack>
          <Input placeholder='Input word' size='lg' color='white' onKeyDown={(e) => {handleInputChange(e)}} />
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default Play