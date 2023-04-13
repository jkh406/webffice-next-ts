import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from "react-redux";
import { store } from "store/configureStore"
import { createTheme } from 'theme';
import { createEmotionCache } from 'utils/create-emotion-cache';
import React from 'react';
import 'styles/calendar.scss';
import 'components/react-grid-table/index.css';

const clientSideEmotionCache = createEmotionCache();
const App = (props : any) => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
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
        <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline /> 
                { getLayout(<Component {...pageProps} />) }
            </ThemeProvider>
        </Provider>
      </LocalizationProvider>
    </CacheProvider>
  );

};


export default App;

export {
  CellContainer,
  HeaderCellContainer,
  Cell,
  EditorCell,
  SelectionCell,
  ColumnVisibility,
  Footer,
  Header,
  HeaderCell,
  HeaderSelectionCell,
  PlaceHolderCell,
  Loader,
  NoResults,
  PopoverButton,
  Row,
  Search,
  Information,
  PageSize,
  Pagination,
} from 'components/react-grid-table/components';

export {
  useDetectClickOutside,
  useResizeEvents,
  useTableManager,
  useRowVirtualizer,
  useColumns,
  useSort,
  useSearch,
  usePagination,
  useRowSelection,
  useRowEdit,
  useRows,
  useAsync,
  useColumnsReorder,
  useColumnsVisibility,
  useColumnsResize,
  useRequestDebounce,
} from 'components/react-grid-table/hooks';