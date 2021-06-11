import {
  Input,
  Stack,
  HStack,
} from '@chakra-ui/react';
import React  from 'react';

const PatientInformation = props => {
  return (
    <Stack spacing={3}>
      <HStack>
        <Input
          variant="filled"
          textAlign="center"
          bgColor="purple.100"
          _hover={{ bgColor: 'purple.100' }}
          color="black"
          isReadOnly
          value={props.patient.firstName}
        />
        <Input
          variant="filled"
          textAlign="center"
          bgColor="purple.100"
          color="black"
          _hover={{ bgColor: 'purple.100' }}
          isReadOnly
          value={props.patient.lastName}
        />
      </HStack>
      <Input
        variant="filled"
        textAlign="center"
        bgColor="purple.100"
        color="black"
        _hover={{ bgColor: 'purple.100' }}
        isReadOnly
        value={props.patient.email}
      />
    </Stack>
  );
};

export default (PatientInformation);
