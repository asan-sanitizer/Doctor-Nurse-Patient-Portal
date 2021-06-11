import React from 'react';
import { Center, Link, Spacer, HStack, Box } from '@chakra-ui/react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signup from './Components/Signup';
import Home from './Components/Home';
import Login from './Components/Login';
import NurseDashBoard from './Components/NurseDashBoard';
import PatientDashBoard from './Components/PatientDashBoard';
import MedicalDetail from './Components/MedicalDetail';

function App() {
  const boxPadding = 3;
  const boxMargin = 10;
  const fontSize = `xl`;

  return (
    <Box pb="5" pt="3" bgColor="white" h="100vh" w="100%">
      <BrowserRouter>
        <Box 
          bg="purple.500" 
          p={boxPadding}
        >
          <Center>
            <Box 
              as="b" 
              mx={boxMargin} 
              fontSize={fontSize}
              color="white"
            >
              <Link href="/home">Home</Link>
            </Box>
            <Spacer />
            <Box 
              as="b" 
              mx={boxMargin}
              fontSize={fontSize}
              color="white"
            >
              <Link href="/login">Login</Link>
            </Box>
            <Box 
              as="b" 
              mx={boxMargin} 
              fontSize={fontSize}
              color="white"
            >
              <Link href="/register">Sign Up</Link>
            </Box>
          </Center>
        </Box>
        <div>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
            <Route path="/dashboard/nurse/:nurseId" component={NurseDashBoard} />
            <Route path="/dashboard/patient/:patientId" component={PatientDashBoard} />
            <Route path="/medicalDetail/:medicalId" component={MedicalDetail} />
          </Switch>
        </div>
      </BrowserRouter>
    </Box>
  );
}

export default App;
