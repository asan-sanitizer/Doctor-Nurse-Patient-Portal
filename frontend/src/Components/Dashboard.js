import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Tabs,
  Button,
  TabList,
  Heading,
  TabPanels,
  Container,
  Spinner,
  Tab,
  FormControl,
  FormLabel,
  Input,
  TabPanel,
} from '@chakra-ui/react';

import axios from 'axios';

import { withRouter } from 'react-router-dom';

const Dashboard = props => {
  const [user, setUser] = useState({});

  const userId = props.match.params.id;
  const api = 'http://localhost:5000/users/' + userId;

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await axios.get(api);
      console.log(' Fetched user data : ', resp.data);
      if(resp.data) {
        setUser(resp.data);
      }
      // setUser(data);
    };
    fetchUser();
  }, []);

  console.log(props);
  return (
    <Box>
        <Container mt="8">
          <Heading size="xl" color="purple.500">
            DashBoard
          </Heading>
          <Heading size="md" color="purple.300">
            {user.username } 
          </Heading>
        </Container>
      )
    </Box>
  );
};

export default withRouter(Dashboard);
