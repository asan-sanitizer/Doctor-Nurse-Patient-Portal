import React, { useState } from 'react';
import {
  Box,
  Center,
  Tabs,
  Button,
  TabList,
  Heading,
  TabPanels,
  Tab,
  HStack,
  FormControl,
  FormLabel,
  Input,
  TabPanel,
} from '@chakra-ui/react';

import axios from 'axios';
import { withRouter } from 'react-router-dom';

function Signup(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();

  const api = 'http://localhost:5000/';

  const createNurse = async () => {
    console.log('Creating Nurse ', username, password);
    const data = {
      username,
      password,
      type: 'nurse',
      email,
      firstName,
      lastName,
    };
    const res = await axios.post(api, data);
    console.log('Result of POST request ', res);
    props.history.push('/login');
  };

  const createPatient = async () => {
    console.log('Creating Patient', username, password);
    const data = {
      username,
      password,
      type: 'patient',
      email,
      firstName,
      lastName,
    };
    const res = await axios.post(api, data);
    console.log('Result of POST request ', res);
    props.history.push('/login');
  };

  return (
    <Center>
      <Box mt="8">
        <Tabs align="center"   isLazy variant="enclosed" colorScheme="purple">
          <TabList>
            <Center>
              <Tab pl="5" _selected={{ bg:"purple.100"}} >
                <Heading
                  size="sm"
                  bgGradient="linear(to-l, #7928CA,#FF0080)"
                  bgClip="text"
                  fontWeight="extrabold"
                >
                  Nurse Portal
                </Heading>
              </Tab>
              <Tab ml="4" _selected={{bg:"purple.100"}}>
                <Heading
                  size="sm"
                  bgGradient="linear(to-l, #7928CA,#FF0080)"
                  bgClip="text"
                  fontWeight="extrabold"
                >
                  Patient Portal
                </Heading>
              </Tab>
            </Center>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box w="500px" ml="2" borderRadius="8px" bgColor="purple.100">
                <HStack ml="4">
                  <FormControl ml="9" w="200px" id="username">
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

                  <FormControl w="194px" id="username">
                    <FormLabel color="purple.500" pt="4">
                      Last Name
                    </FormLabel>
                    <Input
                      variant="filled"
                      borderColor="purple.500"
                      color="purple.500"
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </FormControl>
                </HStack>

                <FormControl ml="2" w="400px" id="username">
                  <FormLabel color="purple.500" pt="4">
                    Email
                  </FormLabel>
                  <Input
                    variant="filled"
                    borderColor="purple.500"
                    color="purple.500"
                    type="text"
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
                    variant="filled"
                    type="password"
                    color="purple.500"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormControl>
                <Center>
                  <Button
                    onClick={createNurse}
                    type="submit"
                    variant="outline"
                    border="4px"
                    borderColor="purple.500"
                    color="purple.500"
                    borderRadius="8"
                    mt="4"
                    mb="4"
                  >
                    Register Nurse
                  </Button>
                </Center>
              </Box>
            </TabPanel>

            <TabPanel>
              <Box w="500px" ml="2" borderRadius="8px" bgColor="purple.100">
                <HStack ml="4">
                  <FormControl ml="8" w="200px" id="username">
                    <FormLabel color="purple.500" pt="4">
                      First Name
                    </FormLabel>
                    <Input
                      variant="filled"
                      borderColor="purple.500"
                      color="purple.500"
                      type="text"
                      value={firstName}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </FormControl>

                  <FormControl w="194px" id="username">
                    <FormLabel color="purple.500" pt="4">
                      Last Name
                    </FormLabel>
                    <Input
                      variant="filled"
                      borderColor="purple.500"
                      type="text"
                      color="purple.500"
                      value={lastName}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </FormControl>
                </HStack>

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
                    onClick={createPatient}
                    type="submit"
                    variant="outline"
                    border="4px"
                    borderColor="purple.500"
                    color="purple.500"
                    borderRadius="8"
                    mt="4"
                    mb="4"
                  >
                    Register Patient
                  </Button>
                </Center>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}
export default withRouter(Signup);
