import React, { useState, useEffect, Children } from 'react';
import { Box, Button, SimpleGrid, Text, Slide, } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Image from 'next/image';
import { apiProductGql } from '../../lib/query';
import client from "../../lib/apollo/apollo-client";
import { currencyType } from '../../lib/currencyEnum';
import { useDispatch } from "react-redux";
import { activeProduct, cartItems, productAction } from '../../redux/actions/productAction';
import { setCookieCurrency, getCookieCurrency } from "../../helpers/currency";
import { useSelector } from 'react-redux';
import { checkStore } from '../products/checkStore';
import { getCartItems, setCartItems } from '../../helpers/cartItems';
import { defaultCurrency } from '../../redux/actions/currencyAction';
import { cartTotalAction } from '../../redux/actions/cartTotal';

interface Props {
    isOpen: boolean;
    onclose: () => {};
    right?: number;
    left?: number;
    overlayClose?: () => {};
}

const Modal: React.FC<Props> = ({
  isOpen,
  onclose,
  right,
  left,
  overlayClose,
}) => {
  const defaultCurr = getCookieCurrency();
  const [currency, setCurrency] = useState(defaultCurr);

  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const {products: { cart } }: any = storeData;
  const {products}: any = storeData;
  const {currencies} = products;
  const productCurrency = currencies.currency;
  const { total }: any = storeData;

  // HANDLE CURRENCY CHANGE
  const handleChange = (e: any) => {
    // setCurrency(e.target.value)
    const { products: { all } }: any = storeData;
    
    if (all[e.target.value]) {
      
      Promise.all([
        setCurrency(e.target.value),
        dispatch(activeProduct(all[e.target.value])),
        dispatch(defaultCurrency(e.target.value)),
        setCookieCurrency(e.target.value || ""),
      ]);

    } else {
      getProducts(e.target.value);
    }
  }

  // FETCH PRODUCTS ON CURRENCY CHANGE
  const getProducts = async (currency: any) => {
    try{
      const { data } = await client.query({
        query: apiProductGql(
          currencyType[currency as keyof typeof currencyType]
        ),
        fetchPolicy: "network-only",
      });

    if (data) {

      const object = new Object;
      object[currency] = data.products;
      
      Promise.all([
        dispatch(activeProduct(data.products)),
        dispatch(productAction(object)),
        setCookieCurrency(currency || ""),
        dispatch(defaultCurrency(currency)),
        setCurrency(currency)
      ]);
      
      
    }
    } catch (err){
      console.info(err);
    }
  }

  // GET CURRENT CART DATA(IMAGE, PRICE, TITLE) FOR CART ITEMS
  const cartExtras = (id: number) => {
    const {
      products: { active },
    }: any = storeData;
    let priceImageObj: any = {};
    try{
    if (cart.length > 0) {
      for (let i = 0; i < active.length; i++) {
        priceImageObj[active[i].id] = {
          price: active[i].price,
          image_url: active[i].image_url,
          title: active[i].title,
        };
      }
    }
    return priceImageObj[id];
  } catch(e){
    console.log(e);
  }
  };

  // UPDATE CART QUANTITY
  const updateQty = async (id: number, action: string) => {
    let cart = getCartItems();

    const update = await checkStore(cart, id, action);
    setCartItems(update);
    dispatch(cartItems(update));
  }

  // CALCULATE TOTAL CART PRICE
  const totalCartPrice = () => {
    
    // let data: any = cart;
    try{
      let cartTotal = 0;

    for (let item of cart) {
      cartTotal += item.qty * cartExtras(item.id).price;
    }
    console.log(cartTotal);
    dispatch(cartTotalAction(cartTotal));
  } catch(e) {
    console.log(e)
  }
  } 

  useEffect(() => {
    totalCartPrice();
    if (isOpen){
      document.body.classList.add('hidden');
    } else{
      document.body.classList.remove('hidden');
    }
    () => false;

  }, [storeData, isOpen]);

  if (!isOpen) {return null};

  return (
    <div>
      {/* <Portal> */}
      <Box className="modal-overlay" onClick={overlayClose}></Box>
      <Slide direction="right" in={isOpen} style={{ zIndex: 10000 }}>
        <Box
          w="100%"
          maxW="550px"
          h="100vh"
          zIndex="3000"
          bg="#f2f2ef"
          position="fixed"
          top={0}
          bottom={0}
          right={0}
          left={left}
          display="block"
          // onClick={() => console.log("Cliked")}
          className="modal-div"
        >
          <Box
            as="form"
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            //   p="1rem"
            h="100%"
          >
            {/* MODAL HEAD */}
            <Box w="100%" p="1rem">
              <SimpleGrid columns={3} spacing="10px">
                <Box
                  as="button"
                  borderWidth="0.8px"
                  borderStyle="solid"
                  borderColor="gray.400"
                  w="2rem"
                  h="2rem"
                  borderRadius="50%"
                  p={0.3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={onclose}
                >
                  <ChevronRightIcon />
                </Box>
                <Box
                  fontSize="10px"
                  textAlign="center"
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="#696969"
                  fontWeight="semibold"
                >
                  <h5>YOUR CART</h5>
                </Box>
                <Box></Box>
              </SimpleGrid>
              <select
                defaultValue={defaultCurr}
                onChange={handleChange}
                style={{
                  marginTop: "1rem",
                  fontSize: "0.8rem",
                  padding: "0.3rem",
                  width: "5.5rem",
                }}
              >
                {productCurrency.map((currency: any) => (
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </Box>

            {/* MODAL BODY */}
            <Box flexGrow={1} h="60%" p="1rem" overflow="scroll">
              <Box overflowY="auto">
                {cart.length > 0 ? (
                  cart.map((item: any) => {
                    // let sum = total;
                    const { id, qty } = item;
                    try {
                      const { price, title, image_url } = cartExtras(id);
                      return (
                        <Box
                          key={id}
                          bg="#fff"
                          padding="15px"
                          mb="20px"
                          minH="inherit"
                          maxH="inherit"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          w="100%"
                        >
                          {/* Cart Info */}

                          <Box color="#1e2d2b" width="70%">
                            <h6>
                              <Text fontSize="13px" lineHeight="1.5">
                                {title}
                              </Text>
                            </h6>

                            <Box
                              mt="1rem"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Box
                                width="76px"
                                padding="7px"
                                borderStyle="solid"
                                borderWidth="0.5px"
                                borderColor="#bcbcbc"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                fontSize="font-size: 15px;"
                              >
                                <Text
                                  as="button"
                                  onClick={(e: any) => {
                                    e.preventDefault(), updateQty(id, "minus");
                                  }}
                                >
                                  -
                                </Text>
                                <Box>{qty}</Box>
                                <Text
                                  as="button"
                                  onClick={(e: any) => {
                                    e.preventDefault(), updateQty(id, "add");
                                  }}
                                >
                                  +
                                </Text>
                              </Box>
                              <Text
                                pl="10px"
                                pr="10px"
                                textAlign="right"
                                fontSize="13px;"
                              >
                                {`${currency} `}
                                {price}
                              </Text>
                            </Box>
                          </Box>

                          {/* Cart Image */}
                          <Box
                            display="flex"
                            justifyContent="center"
                            width="40%"
                          >
                            <Box
                              className="product-image-container"
                              display="flex"
                              justifyContent="center"
                              alignContent="end"
                              h={["3rem", "4rem", "4rem", "4rem"]}
                            >
                              <Image
                                src={image_url}
                                alt="Product"
                                layout="fill"
                                className="image"
                              />
                            </Box>
                          </Box>
                        </Box>
                      );
                    } catch (e) {}
                  })
                ) : (
                  <Box></Box>
                )}
              </Box>
            </Box>

            {/* MODAL FOOTER */}
            <Box
              borderTop="1px"
              borderStyle="solid"
              borderColor="#d0d0d0"
              boxShadow=" 0 -4px 12px rgba(0,0,0,.15)"
              zIndex={1000}
              p="1rem"
              w="100%"
              bg="light"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                fontSize="0.8rem"
              >
                <Text>Subtotal</Text>
                <Text>
                  {currency} {total}
                </Text>
              </Box>
              <Box mt="1rem" w="100%">
                <Button
                  bg="#fff"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor="primary"
                  borderRadius="0"
                  w="100%"
                  py="1.5rem"
                  fontWeight="light"
                  fontSize="0.8rem"
                  _hover={{ bg: "#fff" }}
                  mt="1rem"
                >
                  MAKE THIS A SUBSCRIPTION (SAVE 20%)
                </Button>
                <Button
                  bg="primary"
                  color="#fff"
                  w="100%"
                  borderRadius="0"
                  py="1.5rem"
                  _hover={{ bg: "primary" }}
                  fontSize="0.8rem"
                  my="1rem"
                >
                  PROCEED TO CHECKOUT
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Slide>
      {/* </Portal> */}
    </div>
  ); 
};

export default Modal;
