import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  FormControl,
  FormLabel,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  Input,
  Table,
  Th,
  Tr,
  Thead,
  Tbody,
  Td,
  Center,
  Heading,
  Button,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

function PatientMedicalRecords(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pulseRate, setPulseRate] = useState(0);
  const [respirationRate, setRespirationRate] = useState(0);
  const [comment, setComment] = useState('');
  const [systolic, setSystolic] = useState(0);
  const [diastolic, setDiastolic] = useState(0);
  const [bodyTemperature, setBodyTemperature] = useState(0);

  console.log('Props : ', props);
  const btnRef = React.useRef();

  const history = useHistory();

  async function addMedicalRecord() {
    const data = {
      bodyTemperature: bodyTemperature,
      pulseRate: pulseRate,
      respirationRate: respirationRate,
      systolic: systolic,
      diastolic: diastolic,
      comment: comment,
      patient: props.medicalHistory[0].patient,
      nurse: props.medicalHistory[0].nurse,
    };
    console.log("addMedicalRecord data ", data);
    await axios.post('http://localhost:5000/addMedicalRecord', data).then((data) => console.log(data)).catch(err => console.log("error >>>> ", err));
    // console.log(' request result ', res);
  }

  async function fetchMedicalDetail(medicalRecordId) {
    const api = 'http://localhost:5000/fetchMedicalDetail/' + medicalRecordId;
    const res = await axios.get(api);
    console.log(' fetching medical detail ', res.data);

    history.push('/medicalDetail/' + res.data._id);
  }

  return (
    <Box mt="8" color="gray.800">
      <Center>
        {' '}
        <Heading color="purple.400" mt="5" size="md">
          {' '}
          Medical Records
        </Heading>
      </Center>
      <Center mt="5">
        <Button ref={btnRef} onClick={onOpen} colorScheme="purple">
          <AddIcon pr="1" /> Add Medical Record
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
              <u> Add Medical Record </u>
            </DrawerHeader>

            <DrawerBody ml="12" alignSelf="center" mb="3">
              <form onSubmit={addMedicalRecord}>
                <FormControl ml="8" w="400px">
                  <FormLabel color="purple.500" pt="4">
                    Patient PulseRate
                  </FormLabel>
                  <Input
                    variant="filled"
                    borderColor="purple.500"
                    color="purple.500"
                    type="text"
                    value={pulseRate}
                    onChange={e => setPulseRate(e.target.value)}
                  />
                </FormControl>

                <FormControl ml="8" w="400px">
                  <FormLabel color="purple.500" pt="4">
                    Patient Respiration Rate
                  </FormLabel>
                  <Input
                    borderColor="puple.500"
                    variant="filled"
                    color="purple.500"
                    type="text"
                    value={respirationRate}
                    onChange={e => setRespirationRate(e.target.value)}
                  />
                </FormControl>

                <FormControl ml="8" w="400px">
                  <FormLabel color="purple.500" pt="4">
                    Systolic
                  </FormLabel>
                  <Input
                    borderColor="puple.500"
                    variant="filled"
                    color="purple.500"
                    type="text"
                    value={systolic}
                    onChange={e => setSystolic(e.target.value)}
                  />
                </FormControl>

                <FormControl ml="8" w="400px">
                  <FormLabel color="purple.500" pt="4">
                    Diastolic
                  </FormLabel>
                  <Input
                    borderColor="puple.500"
                    variant="filled"
                    color="purple.500"
                    type="text"
                    value={diastolic}
                    onChange={e => setDiastolic(e.target.value)}
                  />
                </FormControl>

                <FormControl ml="8" w="400px">
                  <FormLabel color="purple.500" pt="4">
                    Body Temperature
                  </FormLabel>
                  <Input
                    borderColor="puple.500"
                    variant="filled"
                    color="purple.500"
                    type="text"
                    value={bodyTemperature}
                    onChange={e => setBodyTemperature(e.target.value)}
                  />
                </FormControl>

                <FormControl ml="8" w="400px">
                  <FormLabel color="purple.500" pt="4">
                    Comment
                  </FormLabel>
                  <Textarea
                    borderColor="puple.500"
                    variant="filled"
                    color="purple.500"
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </FormControl>

                <Center>
                  <Button
                    type="button"
                    onClick={addMedicalRecord}
                    color="purple.500"
                    variant="outline"
                    border="4px"
                    borderColor="purple.500"
                    borderRadius="8"
                    mt="4"
                    mb="4"
                  >
                    Add Medical Record
                  </Button>
                </Center>
              </form>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Table variant="simple" mt="8" size="md" colorScheme="purple">
        <Thead>
          <Tr>
            <Th color="purple.400" textAlign="center">
              Medical Record Id
            </Th>
            <Th color="purple.400" textAlign="center">
              Comments
            </Th>
            <Th color="purple.400" textAlign="center">
              Date
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.medicalHistory.map((item, idx) => (
            <Tr
              key={idx}
              _hover={{ cursor: 'pointer' }}
              action
              onClick={() => {
                fetchMedicalDetail(item._id);
              }}
            >
              <Td color="purple.800">{item._id}</Td>
              <Td color="purple.800">{item.comments}</Td>
              <Td color="purple.800">{item.dateRecorded}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default PatientMedicalRecords;
