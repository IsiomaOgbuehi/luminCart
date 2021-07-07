import React, { useState } from 'react';
import { Flex, Spacer, Box, Button, Select } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Image from 'next/image';
import logo from "../../public/assets/logo.png";
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';

export const NavBar = (currencies: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const { products: {cart} }: any = useSelector((state) => state);
    return (
      <>
        <Flex
          w="100vw"
          alignItems="center"
          justifyContent="space-between"
          paddingTop={["1rem", "1rem", "1rem", "0.5rem"]}
          paddingBottom={["1rem", "1rem", "1rem", "0.5rem"]}
          paddingRight={["1.6rem", "1.6rem", "1.6rem", "2.5rem"]}
          paddingLeft={["1rem", "1rem", "1rem", "2.5rem"]}
          boxShadow="grey 0px 2px 3px -3px"
          position="sticky"
          top="0"
          background="light"
          zIndex="10"
        >
          <Flex
            justifyContent="space-between"
            w={[0, 0, 0, "25.9vw"]}
            alignItems="center"
          >
            {/* HAMBURGER AND LOGO */}
            <Box as="button" p="" width="auto" height="auto" flexGrow={1}>
              <Box
                display={["block", "block", "block", "none"]}
                _hover={{ cursor: "pointer" }}
              >
                <HamburgerIcon w={6} h={6} />
              </Box>

              <Box
                w="9.6rem"
                className="logo-div"
                display={["none", "none", "none", "block"]}
              >
                <Image src={logo} alt="Logo" />
              </Box>
            </Box>

            <Flex
              justifyContent="space-around"
              fontSize="0.9rem"
              fontWeight="500"
              flexGrow={1}
              display={["none", "none", "none", "flex"]}
            >
              <Box as="button">Shop</Box>
              <Box as="button">Learn</Box>
            </Flex>
          </Flex>

          <Spacer />
          <Flex justifyContent="end">
            <Box as="button" mr="1rem" fontSize="0.9rem">
              Account
            </Box>
            <Box position="relative">
              <Box
                position="absolute"
                marginTop="-0.6rem"
                marginLeft="1.9rem"
                fontSize="0.9rem"
              >
                {cart.length > 0 ? cart.length : ""}
              </Box>
              <Box as="button" onClick={() => setIsOpen(true)}>
                <div className="image-container">
                  <Image
                    className="image"
                    src="data:image/png;base64,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"
                    layout="fill"
                    alt="Cart"
                  />
                </div>
              </Box>
            </Box>
          </Flex>
        </Flex>

        <Modal
          isOpen={isOpen}
          onclose={async () => setIsOpen(false)}
          right={0}
        ></Modal>
      </>
    );
}