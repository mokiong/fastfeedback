import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import React from 'react';
import { ProvideAuth } from '../lib/auth';
import theme from '../styles/theme';

const GlobalStyle = ({ children }) => {
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
         {children}
      </>
   );
};

function MyApp({ Component, pageProps }) {
   return (
      <ChakraProvider theme={theme}>
         <ProvideAuth>
            <GlobalStyle>
               <DefaultSeo {...SEO} />
               <Component {...pageProps} />
            </GlobalStyle>
         </ProvideAuth>
      </ChakraProvider>
   );
}

export default MyApp;
