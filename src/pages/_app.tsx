import { Box, ChakraProvider, Container } from '@chakra-ui/react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { BaseProvider, createDarkTheme } from 'baseui'
import { Provider as SessionProvider } from 'next-auth/client'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider as StyletronProvider } from 'styletron-react'
import { ConsentModal } from '../components'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import PrivateRoute from '../components/PrivateRoute'
import { styletron } from '../styletron'
import theme from '../theme'
import { BASE_API_URL } from '../utils/constants'


axios.defaults.baseURL = BASE_API_URL;

const baseDarkTheme = createDarkTheme({}, {
  colors: {
    inputTextDisabled: theme.colors.white
  }
})


function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  return <>
    <Head>
      <title>GOLDZIP</title>
    </Head>
    <StyletronProvider value={styletron}>
      <BaseProvider theme={baseDarkTheme}>
        <ChakraProvider resetCSS theme={theme}>
          <SessionProvider session={pageProps.session}>
            <Container px={'20px'} maxWidth="1000px" minH={'100vh'} display={'flex'} flexDirection={'column'} p={0}>
              <Header />
              <ConsentModal />
              <Box flex={1} my={6} p={4}>
                <PrivateRoute protectedRoutes={[
                  // '/account',
                  // '/redemption', '/redemption/[id]', '/redemption/new',
                  // '/tracking', '/tracking/[ticketId]'
                ]}>
                  <Component {...pageProps} />
                </PrivateRoute>
              </Box>
              {/* <Footer /> */}
            </Container>
          </SessionProvider >
        </ChakraProvider>
      </BaseProvider>
    </StyletronProvider>
  </>
}

export default MyApp
