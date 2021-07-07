import React, {useEffect, useState} from 'react';
import { Box, SimpleGrid, Text, Button, Container } from "@chakra-ui/react";
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from "react-redux";
import { getCookieCurrency } from '../../helpers/currency';
import { getCartItems, setCartItems } from "../../helpers/cartItems";
import Modal from '../modal/modal';
import { Product } from './type';
import { useDispatch } from 'react-redux';
import { cartItems } from '../../redux/actions/productAction';
import { checkStore } from './checkStore';

export const Products = () => {

  const dispatch = useDispatch()

  const { products }: any = useSelector((state) => state);
  const defaultCurrency = useSelector((state: any) => state.currency);
  const product = products.active;

  const [currency, setCurrency] = useState(defaultCurrency);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = async ({ id }: Product) => {
    const item = { id: id, qty: 1 };

    let cart = getCartItems();

    if (cart.length > 0) {
      const check = await checkStore(cart, id, "add");
      
      if (check.length > 0) {
        setCartItems(check);
        dispatch(cartItems(check));
      } else {
        cart.push(item);
        setCartItems(cart);
        dispatch(cartItems(cart));
      }
    } else {
      cart.push(item);
      setCartItems(cart);
      dispatch(cartItems(cart));
    }
    setIsOpen(true);
  };

  useEffect(() => {
    setCurrency(() => getCookieCurrency());
    dispatch(cartItems(getCartItems()));
    if (defaultCurrency) {
      setCurrency(defaultCurrency);
    }
  }, [product, defaultCurrency]);

    return (
      <>
        <Box w="100vw" bg="backgroundLight">
          <SimpleGrid
            w={["90%", "90%", "90%", "70%"]}
            columns={[2, 2, 3, 3]}
            spacing={["40px"]}
            mx="auto"
          >
            {product.length !== 0 ? (
              product.map((product: Product) => {
                const { id, title, price, image_url } = product;
                return (
                  <Box
                    key={id}
                    width={["100%"]}
                    px={["0rem", "0rem", "0rem", "0rem"]}
                    py="2rem"
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      flexShrink={1}
                      flexWrap="wrap"
                      justifyContent="center"
                      //   h="120px"
                    >
                      <Box>
                        <Link href="/">
                          <a>
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              justifyContent="space-between"
                              h={["6rem", "6rem", "9rem", "12rem"]}
                            >
                              <Box
                                className="product-image-container"
                                display="flex"
                                alignContent="center"
                                h={["4rem", "4rem", "7rem", "10rem"]}
                              >
                                <Image
                                  src={image_url}
                                  alt="Product"
                                  layout="fill"
                                  className="image"
                                />
                              </Box>
                              <Text
                                fontSize={["0.8rem", "0.8rem", "1rem", "1rem"]}
                                textAlign="center"
                              >
                                {title}
                              </Text>
                            </Box>
                          </a>
                        </Link>
                      </Box>
                      <Text
                        mt="1rem"
                        fontSize={["0.9rem", "0.9rem", "1rem", "1rem"]}
                      >
                        <span style={{ marginRight: "0.3rem" }}>
                          {currency}
                        </span>{" "}
                        {price}
                      </Text>
                      <Button
                        borderRadius={0}
                        bg="primary"
                        minW={["100%", "100%", "100%", "50%"]}
                        mt="0.5rem"
                        py="1.6rem"
                        color="#fff"
                        fontSize="0.8rem"
                        _hover={{ bg: "cartBtnHover" }}
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box />
            )}
          </SimpleGrid>
        </Box>
        <Modal
          isOpen={isOpen}
          onclose={async () => setIsOpen(false)}
          right={0}
        >
        </Modal>
      </>
    );
}