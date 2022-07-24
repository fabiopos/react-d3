import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const ChildrenTable = ({ data = [] }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Children table</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Age</Th>
            <Th isNumeric>Height</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((child, index) => (
            <Tr key={`child-${index}`}>
              <Td>{child.name}</Td>
              <Td isNumeric>{child.age}</Td>
              <Td isNumeric>{child.height}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

ChildrenTable.propTypes = {
  data: PropTypes.array,
};

export default ChildrenTable;
