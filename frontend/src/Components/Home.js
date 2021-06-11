import React from 'react';
import {
  Box,
  Center,
  Divider,
  Heading,
  Image,
  Link,
  Text
} from '@chakra-ui/react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signup from './Signup';
import Login from './Login';

// Image Imports

import image1 from '../images/14358499248_ba89379928_o.jpg';
import image2 from '../images/27649754016_fc031eb908_o.jpg';
import image3 from '../images/34406844136_214f419db3_o.jpg';
import image4 from '../images/national-cancer-institute-NFvdKIhxYlU-unsplash.jpg';

var Home = () => {
  // Box configurations

  const maxWidth = '800px';
  const paddingBox = 4;
  const marginBox = 4;
  const borderWidth = '1px';
  const borderRadius = '12px';
  
  // Heading configurations

  const paddingHeading = 2;

  // Image configurations

  const marginImg = 4;
  const paddingImg = 4;
  const sizeImg = '450px';

  return (
    <Center>
      <Box
        maxW={maxWidth}
      >
        {/* Page Title */}

        <Box
          p={paddingBox}
          my={marginBox}
        >
          <Heading
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            fontSize="6xl"
          >
            Nurse-Patient Monitor App
          </Heading>

        </Box>

        {/* Box Section - Info*/}

        <Box
          borderWidth={borderWidth}
          borderRadius={borderRadius}
          p={paddingBox}
          my={marginBox}
        >

          <Center>
            <Heading
              as="h2"
              color="purple.500"
              size="xl"
              py={paddingImg}
            >
              Always Here For You
            </Heading>
          </Center>

          <Center>
          <Image 
              src={image1}
              maxWidth={sizeImg}
              mx={marginImg}
            />
          </Center>

          <Text>
            We understand how difficult it can be when you leave the hospital for the first time. The <b>NPMA</b>, or 
            the <b>Nurse-Patient Monitor App</b>, is here to help both patients and nurses.
          </Text>

        </Box>

        <Box
          borderWidth={borderWidth}
          borderRadius={borderRadius}
          p={paddingBox}
          my={marginBox}
        >
          
          <Center>
            <Heading
                as="h2"
                color="purple.500"
                size="xl"
                py={paddingImg}
              >
              For Patients
            </Heading>
          </Center>

          <Center>
            <Image 
              src={image3}
              maxWidth={sizeImg}
              mx={marginImg}
            />
          </Center>

          <Text>
            See your patient information, keep track of your medical records, send alerts to your nurse, and receive 
            motivational media from your nurse, so you can stay on the course towards a full recovery.
          </Text>
        </Box>
        
        <Box
          borderWidth={borderWidth}
          borderRadius={borderRadius}
          p={paddingBox}
          my={marginBox}
        >
          <Center>
            <Heading
                as="h2"
                color="purple.500"
                size="xl"
                py={paddingImg}
              >
              For Nurses
            </Heading>
          </Center>

          <Center>
            <Image 
              src={image2}
              maxWidth={sizeImg}
              mx={marginImg}
            />
          </Center>

          <Text>
            Receive an overview of all your patients, receive alerts sent to you from your patients, and stay connected 
            with your patients to help them stay healthy and on the course towards a full recovery.
          </Text>

        </Box>
        
        <Box
          borderWidth={borderWidth}
          borderRadius={borderRadius}
          p={paddingBox}
          my={marginBox}
        >

          <Center>
            <Heading
              color="purple.500"
              as="h2"
              size="xl"
              py={paddingHeading}
            >
              Ready to Get Started?
            </Heading>
          </Center>

          <Center>
            <Image 
              src={image4}
              maxWidth={sizeImg}
              py={paddingHeading}
            />
          </Center>

          <BrowserRouter>
              <Text>
                Get started by creating a new account as a <b>Patient</b> or a <b>Nurse</b> under <Link color="blue.500" href="/register">Sign Up</Link>, 
                or <Link color="blue.500" href="/register">Log In</Link> to an existing account.
              </Text>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Signup} />
            </Switch>
          </BrowserRouter>

        </Box>

      </Box>

    </Center>
  );
};

export default Home;
