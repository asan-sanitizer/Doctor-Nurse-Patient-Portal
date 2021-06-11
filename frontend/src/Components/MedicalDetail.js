import {
  Box,
  Button,
  VStack,
  Stack,
  Input,
  HStack,
  Heading,
  Text,
  Center,
  Textarea,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router';

const MedicalDetail = props => {
  const [medicalRecord, setMedicalRecord] = useState('');
  const history = useHistory();

  const navigateToPatientDashboard = () => {
    history.push('/dashboard/patient/' + medicalRecord.patient);
  };

  useEffect(() => {
    const fetchMedicalDetail = async () => {
      const api =
        'http://localhost:5000/fetchMedicalDetail/' +
        props.match.params.medicalId;
      const res = await axios.get(api);
      console.log(res.data);
      setMedicalRecord(res.data);
      console.dir('Props: ', props);
    };

    fetchMedicalDetail();
  }, []);

  return (
    <Center>
      <Box mt="5">
        <Center>
          <Heading mt="4" mb="4" color="purple.500" size="lg">
            Medical Record Detail
          </Heading>
        </Center>
        <Center>
          {' '}
          <Stack spacing={3}>
            <HStack>
              <InputGroup>
                <InputLeftAddon children="Body Temperature" />
                <Input
                  variant="filled"
                  textAlign="center"
                  bgColor="purple.100"
                  _hover={{ bgColor: 'purple.100' }}
                  color="black"
                  isReadOnly
                  value={medicalRecord.bodyTemperature}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftAddon children="Pulse Rate" />
                <Input
                  variant="filled"
                  textAlign="center"
                  bgColor="purple.100"
                  color="black"
                  _hover={{ bgColor: 'purple.100' }}
                  isReadOnly
                  value={medicalRecord.pulseRate}
                />
              </InputGroup>
            </HStack>
            <InputGroup>
              <InputLeftAddon children="Systolic BP" />
              <Input
                variant="filled"
                textAlign="center"
                bgColor="purple.100"
                color="black"
                _hover={{ bgColor: 'purple.100' }}
                isReadOnly
                value={medicalRecord.systolic}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Diastolic BP" />
              <Input
                variant="filled"
                textAlign="center"
                bgColor="purple.100"
                color="black"
                _hover={{ bgColor: 'purple.100' }}
                isReadOnly
                value={medicalRecord.diastolic}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Date Recorded" />
              <Input
                variant="filled"
                textAlign="center"
                bgColor="purple.100"
                color="black"
                _hover={{ bgColor: 'purple.100' }}
                isReadOnly
                value={medicalRecord.dateRecorded}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Comments" />
              <Input
                variant="filled"
                textAlign="center"
                bgColor="purple.100"
                color="black"
                _hover={{ bgColor: 'purple.100' }}
                isReadOnly
                value={medicalRecord.comments}
              />
            </InputGroup>
          </Stack>
        </Center>
        <Center>
          <Button
            onClick={navigateToPatientDashboard}
            colorScheme="purple"
            mt="5"
          >
            Go Back To Patient Dashboard
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default withRouter(MedicalDetail);
