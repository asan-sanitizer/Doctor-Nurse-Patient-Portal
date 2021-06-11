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
  FormControl,
  FormLabel,
  Input,
  TabPanel,
} from '@chakra-ui/react';

import axios from 'axios';

import {withRouter , useHistory} from 'react-router';

var Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const api = 'http://localhost:3000/auth';

  const authNurse = async () => {
    console.log('Auth Nurse ', username, password);
    const res = await axios.post(api, { username, password });
    console.log('Result of POST request ', res);

    //if auth sucess then launch the nurse dashboard
    if(res.data.status == "success") {
      history.push('/dashboard/nurse/' + res.data.userData.user._id);
    }
  };

  const authPatient = async () => {
    console.log('Auth Patient ', username, password);
    const res = await axios.post(api, { username, password });
    //if auth sucess then launch the nurse dashboard
    if(res.data.status == "success") {
      history.push('/dashboard/patient/' + res.data.userData.user._id);
    }
    console.log('Result of POST request ', res);
  };

  return (
    <Center>
      <Box mt="8">
        <Tabs variant="enclosed" align="center" colorScheme="purple">
          <TabList>
            <Center>
              <Tab _selected={{bg:"purple.100"}}>
                <Heading
                  size="sm"
                  bgGradient="linear(to-l, #7928CA,#FF0080)"
                  bgClip="text"
                  fontWeight="extrabold"
                >
                  Patient Portal
                </Heading>
              </Tab>
              <Tab _selected={{bg:"purple.100"}}>
                <Heading
                  size="sm"
                  bgGradient="linear(to-l, #7928CA,#FF0080)"
                  bgClip="text"
                  fontWeight="extrabold"
                >
                  Nurse Portal
                </Heading>
              </Tab>
            </Center>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box w="500px" ml="-7" borderRadius="8px" bgColor="purple.100">
                <FormControl ml="8" w="400px" id="username">
                  <FormLabel color="purple.500" pt="4">
                    Patient Username
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
                <FormControl ml="8" w="400px" id="password">
                  <FormLabel color="purple.500" pt="4">
                    Patient Password
                  </FormLabel>
                  <Input
                    borderColor="puple.500"
                    variant="filled"
                    color="purple.500"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormControl>
                <Center>
                  <Button
                    onClick={authPatient}
                    type="submit"
                    variant="outline"
                    color="purple.500"
                    border="4px"
                    borderColor="purple.500"
                    borderRadius="8"
                    mt="4"
                    mb="4"
                  >
                    Login
                  </Button>
                </Center>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box w="500px" ml="-7" borderRadius="8px" bgColor="purple.100">
                <FormControl ml="8" w="400px" id="username">
                  <FormLabel color="purple.500" pt="4">
                    Nurse Username
                  </FormLabel>

                  <Input
                    variant="filled"
                    borderColor="puple.500"
                    color="purple.500"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl ml="8" w="400px" id="password">
                  <FormLabel color="purple.500" pt="4">
                    Nurse Password
                  </FormLabel>
                  <Input
                    borderColor="puple.500"
                    color="purple.500"
                    variant="filled"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormControl>
                <Center>
                  <Button
                    onClick={authNurse}
                    type="submit"
                    color="purple.500"
                    variant="outline"
                    border="4px"
                    borderColor="purple.500"
                    borderRadius="8"
                    mt="4"
                    mb="4"
                  >
                    Login
                  </Button>
                </Center>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
};

export default withRouter(Login);
