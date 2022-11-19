import { Outlet } from 'umi';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
// import { purple } from '@mui/material/colors';
// import { Link, Outlet } from 'umi';
// import styles from './index.less';

const theme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // Purple and green play nicely together.
      main: '#854CD8',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#DE7582',
    },
  },
}));

export default function Layout() {
  return (
    <React.Fragment>
      {/* 重置css */}
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </React.Fragment>
    // <div className={styles.navs}>
    //   {/* <ul>
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/docs">Docs</Link>
    //     </li>
    //     <li>
    //       <a href="https://github.com/umijs/umi">Github</a>
    //     </li>
    //   </ul> */}
    //   <Outlet />
    // </div>
  );
}
