import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from "../redux/store";
import { ApolloProvider } from "@apollo/client";
import client from '../lib/apollo/apollo-client';
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
import Fonts from '../styles/theme';

const theme = extendTheme({
  // Fonts,
  fonts: {
    body: "Bau, san-serif",
  },
  colors: {
    light: "#f5f5f4",
    primary: "rgb(75, 85, 72)",
    cartBtnHover: "#313530",
    backgroundLight: "#e2e6e3",
  },
  styles: {
    global: {
      body: {
        bg: "#f5f5f4", // "gray.400",
        transition: "2s ease-in-out;"
      },
    },
  },
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <Fonts />
            <Component {...pageProps} />
          </ChakraProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp
