import {
  Box,
  List,
  ListItem,
  ListIcon,
  Input,
  Center,
  Heading,
  HStack,
  Button,
  FormLabel,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
  FormControl,
  useToast,
} from '@chakra-ui/react';

import { CheckCircleIcon as MdCheckCircle } from '@chakra-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import PatientInformation from '../Components/PatientInformation';
import PatientMedicalRecords from '../Components/PatientMedicalRecords';

const PatientDashBoard = props => {
  const [patient, setPatient] = useState({});
  const [medicalHistory, setMedicalHistory] = useState([{}]);
  const [nurseName, setNurseName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [motivations, setMotivations] = useState([]);

  const toast = useToast();

  const patientId = props.match.params.patientId;

  const fetchPatientInfo = async () => {
    const api = 'http://localhost:5000/users/' + patientId;
    const res = await axios.get(api);
    console.log(' Fetching patient details  ', res);
    setPatient(res.data);
  };

  const fetchMotivationalText = async () => {
    console.log(patient);
    const api = 'http://localhost:5000/getMotivations/' + patientId;
    console.log(' Making request to ', api);
    const res = await axios.get(api);
    setMotivations(res.data);
    console.log('motivational fetched  ', res);
  };

  const fetchMedicalRecords = async () => {
    const api = 'http://localhost:5000/fetchMedicalRecords/' + patientId;
    const res = await axios.get(api);
    console.log(' fetching medical records ', res.data);
    setMedicalHistory(res.data);
  };

  const sendAlert = async () => {
    console.log('sending alert ');
    const data = {
      sentBy: patient._id,
      receiver: nurseName,
      message: alertMessage,
    };
    const api = 'http://localhost:5000/sendAlert';
    const res = await axios.post(api, data);
    console.log(res);

    toast({
      title: 'Alert Sent!',
      description: 'Alert has been sent to the ' + nurseName,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    fetchPatientInfo();
    fetchMedicalRecords();
    fetchMotivationalText();
  }, []);

  return (
    <Center color="purple">
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
            Patient Dashboard
          </Heading>
        </Center>
        <Divider mt="4" size="xl" bgColor="purple.500" />
        <Center>
          <Heading
            orientation="vertical"
            color="purple.400"
            mt="8"
            mb="4"
            size="md"
          >
            Patient Information
          </Heading>
        </Center>
        <Center>
          <VStack>
            <PatientInformation patient={patient} />

            <PatientMedicalRecords medicalHistory={medicalHistory} />

            <Box mt="8" pt="8" w="500px">
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" color="purple.700" textAlign="left">
                      Send Alert To Nurse
                    </Box>
                    <AccordionIcon colorScheme="purple" />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <form>
                      <HStack>
                        <FormControl ml="1" mr="2" w="200px" id="username">
                          <FormLabel color="purple.500" pt="4">
                            Nurse Name
                          </FormLabel>
                          <Input
                            variant="filled"
                            borderColor="purple.500"
                            color="purple.500"
                            type="text"
                            w="200px"
                            value={nurseName}
                            onChange={e => setNurseName(e.target.value)}
                          />
                        </FormControl>
                        <FormControl ml="3" mr="4" w="200px" id="username">
                          <FormLabel color="purple.500" pt="4">
                            Alert Message
                          </FormLabel>
                          <Input
                            variant="filled"
                            borderColor="purple.500"
                            color="purple.500"
                            type="text"
                            w="200px"
                            value={alertMessage}
                            onChange={e => setAlertMessage(e.target.value)}
                          />
                        </FormControl>
                      </HStack>
                      <Center>
                        <Button
                          onClick={sendAlert}
                          mr="3"
                          w="400px"
                          colorScheme="purple"
                          mt="4"
                        >
                          Send Alert
                        </Button>
                      </Center>
                    </form>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" color="purple.700" textAlign="left">
                      Motivational Texts
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Center mt="4" h="100%">
                      <List spacing={3}>
                        {motivations.map((item, idx) => (
                          <ListItem key={idx}>
                            <ListIcon as={MdCheckCircle} color="green.500" />
                            {item}
                          </ListItem>
                        ))}
                      </List>
                    </Center>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </VStack>
        </Center>
        <Center mt="12" w="100%" h="100%">
        <iframe src='https://www.youtube.com/embed/jnOJvOQV32k'
        frameborder='2px'
        width="100%"
        height="900px"
        allow='autoplay; encrypted-media'
        allowfullscreen
        title='video'
/>
        </Center>
      </Box>
    </Center>
  );
};

export default withRouter(PatientDashBoard);
