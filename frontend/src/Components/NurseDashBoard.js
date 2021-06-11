import {
  Box,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  List,
  ListItem,
  ListIcon,
  Table,
  TableCaption,
  Th,
  Button,
  Drawer,
  DrawerHeader,
  HStack,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  FormLabel,
  FormControl,
  Input,
  Tr,
  Thead,
  Tbody,
  Td,
  Center,
  Heading,
  useDisclosure,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import { CheckCircleIcon as MdCheckCircle } from '@chakra-ui/icons';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';

import { AddIcon } from '@chakra-ui/icons';

var NurseDashBoard = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [nurseDetail, setNurseDetail] = useState();
  const [patients, setPatients] = useState([]);
  const [patientUsername, setPatientUsername] = useState('');
  const [nurseUsername, setNurseUsername] = useState('');
  const [alerts, setAlerts] = useState([]);

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [motivationalTips, setMotivationalTips] = useState('');

  const api = 'http://localhost:5000/users/' + props.match.params.nurseId;

  const history = useHistory();
  const btnRef = React.useRef();

  const fetchNurseDetail = async () => {
    const res = await axios.get(api);
    console.log(' Nurse ', res.data);
    setNurseDetail(res.data);
    setNurseUsername(res.data.username);
    // fetchEmergencyAlerts();
  };

  const fetchAllPatients = async () => {
    const res = await axios.get('http://localhost:5000/fetchPatients/');
    console.log('List of all patients ', res.data);
    setPatients(res.data);
  };

  const fetchEmergencyAlerts = async () => {
    const api =  'http://localhost:5000/fetchAlerts/' + nurseUsername
    const res = await axios.get(api); 
    console.log(' Alerts for nurse ', nurseUsername);
    console.dir(res.data);
    setAlerts(res.data);
  };

  const showPatientDetail = id => {
    console.log(id);
    history.push('/dashboard/patient/' + id);
  };

  const addNewPatient = async () => {
    console.log('new patient added ');
    const api = 'http://localhost:5000/';

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
      type: 'patient',
    };
    const res = await axios.post(api, data);
    console.log(' New Patient added to the database ');
    console.log(res);
  };

  const sendMotivationalTips = async () => {
    console.log('broadcast the motivational tips to all patients');
    const api = 'http://localhost:5000/sendMotivation';

    const data = {
      author: props.match.params.nurseId,
      message: motivationalTips,
      patientUsername: patientUsername,
    };
    console.dir('sending data ', data);
    const res = await axios.post(api, data);
    console.log('Broadcasted the tips to patients ', res);
  };

  useEffect(() => {
    fetchNurseDetail();
    fetchAllPatients();
    fetchEmergencyAlerts();
  }, []);
  console.log(props);

  return (
    <Center>
      <Box>
        <Center>
          <Heading
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            mt="8"
            bgClip="text"
            fontSize="4xl"
            color="purple.500"
            fontWeight="extrabold"
          >
            Nurse Dashboard
          </Heading>
        </Center>
        <Center>
          <Heading mt="8" color="purple.800" mb="8" size="md">
            <u>{nurseUsername} </u>
          </Heading>
        </Center>

        <Center mb="4">
          <Button ref={btnRef} onClick={onOpen} colorScheme="purple">
            <AddIcon pr="1" /> Add New Patient
          </Button>
        </Center>

        <Drawer
          size="lg"
          isOpen={isOpen}
          placement="top"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader mt="4" alignSelf="center" color="purple.800">
                <u> Add New Patient </u>
              </DrawerHeader>

              <DrawerBody ml="12" alignSelf="center" mb="3">
                <FormControl id="username">
                  <FormLabel color="purple.500" pt="4">
                    First Name
                  </FormLabel>
                  <Input
                    variant="filled"
                    borderColor="purple.500"
                    color="purple.500"
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </FormControl>

                <FormControl id="username">
                  <FormLabel color="purple.500" pt="4">
                    Last Name
                  </FormLabel>
                  <Input
                    variant="filled"
                    borderColor="purple.500"
                    type="text"
                    color="purple.500"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </FormControl>

                <FormControl ml="2" w="400px" id="username">
                  <FormLabel color="purple.500" pt="4">
                    Email
                  </FormLabel>
                  <Input
                    variant="filled"
                    borderColor="purple.500"
                    type="text"
                    color="purple.500"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl ml="2" w="400px" id="username">
                  <FormLabel color="purple.500" pt="4">
                    Username
                  </FormLabel>
                  <Input
                    variant="filled"
                    borderColor="purple.500"
                    color="purple.500"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl ml="2" w="400px" id="password">
                  <FormLabel color="purple.500" pt="4">
                    Password
                  </FormLabel>
                  <Input
                    borderColor="purple.500"
                    color="purple.500"
                    variant="filled"
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormControl>

                <Center>
                  <Button
                    type="submit"
                    onClick={addNewPatient}
                    colorScheme="purple"
                    mt="4"
                  >
                    {' '}
                    Add Patient{' '}
                  </Button>
                </Center>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>

        <Table variant="simple" size="lg" colorScheme="purple">
          <TableCaption
            placement="top"
            fontWeight="extrabold"
            fontSize="32px"
            color="purple.700"
          >
            Patients List{' '}
          </TableCaption>
          <Thead>
            <Tr>
              <Th color="purple.400">First Name </Th>
              <Th color="purple.400">Last Name </Th>
              <Th color="purple.400">Username </Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients.map((item, idx) => (
              <Tr
                key={idx}
                _hover={{ cursor: 'pointer' }}
                action
                onClick={() => {
                  showPatientDetail(item._id);
                }}
              >
                <Td color="black">{item.firstName}</Td>
                <Td color="black">{item.lastName}</Td>
                <Td color="black">{item.username}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Center>
          <Box mt="8" pt="8" w="500px">
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box
                    fontWeight="extrabold"
                    flex="1"
                    color="purple.700"
                    textAlign="left"
                  >
                    Broadcast Motivational Tips
                  </Box>
                  <AccordionIcon colorScheme="purple" />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <form>
                    <FormControl id="username">
                      <Center>
                        <FormLabel
                          fontWeight="extrabold"
                          color="purple.500"
                          pt="4"
                        >
                          Patient Username
                        </FormLabel>
                      </Center>
                      <Input
                        variant="filled"
                        borderColor="purple.500"
                        color="purple.500"
                        type="text"
                        value={patientUsername}
                        onChange={e => setPatientUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="username">
                      <Center>
                        <FormLabel
                          fontWeight="extrabold"
                          color="purple.500"
                          pt="4"
                        >
                          Send Motivational Tips
                        </FormLabel>
                      </Center>
                      <Textarea
                        variant="filled"
                        borderColor="purple.500"
                        color="purple.500"
                        type="text"
                        value={motivationalTips}
                        onChange={e => setMotivationalTips(e.target.value)}
                      />
                    </FormControl>
                    <Center>
                      <Button
                        onClick={sendMotivationalTips}
                        mr="3"
                        w="400px"
                        colorScheme="purple"
                        mt="4"
                      >
                        Send Motivation
                      </Button>
                    </Center>
                  </form>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Center>
              <Heading mt="12" color="purple.400" size="lg"> Emergency Alert </Heading>
            </Center>
            <Center mt="12">
              <List spacing={3}>
                {alerts.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListIcon as={MdCheckCircle} color="red.500" />
                    {item.message}
                  </ListItem>
                ))}
              </List>
            </Center>
          </Box>
        </Center>
      </Box>
    </Center>
  );
};

export default withRouter(NurseDashBoard);
