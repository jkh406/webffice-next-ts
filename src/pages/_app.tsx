import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from "react-redux";
import { store } from "store/configureStore"
import { AuthConsumer, AuthProvider } from 'contexts/auth-context';
import { useNProgress } from 'hooks/use-nprogress';
import { createTheme } from 'theme';
import { createEmotionCache } from 'utils/create-emotion-cache';
import 'styles/calendar.scss'

const clientSideEmotionCache = createEmotionCache();
const SplashScreen  = () : null => null;

const App = (props : any) => {
  
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page : any) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          AnBTech Webffice
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline /> 
            <Provider store={store}>
              <AuthConsumer>
                {
                  (auth : any) => auth.isLoading
                    ? <SplashScreen />
                    : getLayout(<Component {...pageProps} />) 
                }
              </AuthConsumer> 
            </Provider>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
