import { ThemeProvider } from '@chakra-ui/react';
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
      <ThemeProvider theme={theme}>
         <ProvideAuth>
            <Component {...pageProps} />
         </ProvideAuth>
      </ThemeProvider>
   );
}

export default MyApp;
