import React from 'react';
import { Flex, Spacer, Box, Select, Text } from "@chakra-ui/react";

export const Filter = () => {
    return (
      <Flex w="100%" h="280px" alignItems="center">
        <Flex
          w={["90%", "90%", "90%", "70%"]}
          //   h="50%"
          flexDirection={["column", "column", "column", "row"]}
          mx="auto"
          my="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box w={["100%", "100%", "100%", "auto"]}>
            <Text
              fontSize="3rem"
              lineHeight="1.25em"
              fontFamily="Freight Display Pro"
              //   fontWeight="thin"
            >
              All Products
            </Text>
            <Text fontFamily={`Bua, sans-serif`} mt="1rem" fontSize="1rem" lineHeight="1.5">A 360° look at Lumin</Text>
          </Box>

          <Flex
            // flexGrow={[0, 0, 0, 1]}
            justifyContent={["start", "start", "start", "end"]}
            w={["100%", "100%", "100%", "50%"]}
            mt={["1.5rem", "1.5rem", "1.5rem", "0rem"]}
          >
            <Select
              placeholder="Filter By"
              borderRadius={0}
              w={["100%", "100%", "100%", "23rem"]}
              h={["3.2rem", "3.2rem", "3.2rem", "3.5rem"]}
              borderColor="gray.300"
              bg="white"
              fontSize="1rem"
              _hover={{ borderColor: "gray.300" }}
              _focus={{ borderColor: "#000" }}
            >
              <option value="all">All Products</option>
            </Select>
          </Flex>
        </Flex>
      </Flex>
    );
}