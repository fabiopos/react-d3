import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

const ChildrenForm = ({ onClick }) => {
  const [child, setChild] = useState({
    name: "",
    age: 0,
    height: 0,
  });
  const handleClick = () => {
    onClick(child);
  };
  return (
    <Box p="5">
      <FormControl mb="5">
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          onChange={(e) =>
            setChild((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </FormControl>

      <FormControl mb="5">
        <FormLabel>Age</FormLabel>
        <NumberInput
          max={50}
          min={1}
          onChange={(e) => setChild((prev) => ({ ...prev, age: e }))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl mb="5">
        <FormLabel>Height</FormLabel>
        <NumberInput
          max={170}
          min={10}
          onChange={(e) => setChild((prev) => ({ ...prev, height: e }))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <Button onClick={handleClick} colorScheme="blue">
        Add Child
      </Button>
    </Box>
  );
};

ChildrenForm.propTypes = {
  onClick: PropTypes.func,
};

export default ChildrenForm;
