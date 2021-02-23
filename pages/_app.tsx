import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import React from 'react';
import { ProvideAuth } from '../lib/auth';
import theme from '../styles/theme';

const GlobalStyle = () => {
   return (
      <>
         <Global
            styles={css`
               html {
                  min-width: 360px;
                  scroll-behavior: smooth;
                  background-color: #edf2f7;
               }

               #__next {
                  display: flex;
                  flex-direction: column;
                  min-height: 100vh;
               }
            `}
         />
      </>
   );
};

function MyApp({ Component, pageProps }) {
   return (
      <ChakraProvider theme={theme}>
         <ProvideAuth>
            <GlobalStyle />
            <Component {...pageProps} />
         </ProvideAuth>
      </ChakraProvider>
   );
}

export default MyApp;
