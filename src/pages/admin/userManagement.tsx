import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard-layout';
import { UsersTable } from 'sections/admin/admin-table';
import { UsersSearch } from 'sections/admin/admin-search';
import { useUserRole } from 'hooks/use-userrole'
import { useRouter } from 'next/router';
import { AdminNav } from 'layouts/admin-nav';
import { usePathname } from 'next/navigation';
import axios from 'axios';

export async function getServerSideProps(context : any) {
  const USER_API_BASE_URL = "http://localhost:8080/api/admin";
	let cookieString = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  cookieString = cookieString.split("; ");
  let result : any = {};
  for (var i = 0; i < cookieString.length; i++) {
    var cur = cookieString[i].split("=");
    result[cur[0]] = cur[1];
  }

  if (context.req && cookieString) {
    axios.defaults.headers.Cookie = result.auth;
  }
  
  const response = await axios.post(USER_API_BASE_URL + "/SelectUser", null, { 
    withCredentials: true,    
    headers: {
     Authorization: result.auth,
     },     
  });
  const payload = response.data.map((rowData: any ) => ({
    id : rowData.user_ID,
    avatar : rowData.avatar,
    startDate : rowData.start_date,
    email : rowData.user_ID,
    name : rowData.user_name,
    phone : rowData.phone,
    rank : rowData.rank,
    address : rowData.address,
    detail_address : rowData.detail_address
  }));
  
  return {
    props: {
      item: payload,
    },
  };
}

const Page = ({item} : any) => {
  const userRole = useUserRole();
  const router = useRouter();
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  
  useEffect(() => {
    if(userRole && userRole !== 'ADMIN')
    {         
      router
        .replace({
          pathname: '/auth/login',
          query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
        })
        .catch(console.error);
    }
    handlePathnameChange();
  }, [userRole, pathname]);

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  return (
    <>
      <Head>
        <title>
          User Management | A&B Technology
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={2}>
            <AdminNav 
              onClose={() => setOpenNav(false)}
              open={openNav}/>
            <Stack spacing={1}>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                )}
                >
                Export
                </Button>
              </Stack>
            </Stack>
              <UsersSearch />
              <UsersTable item={item} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page : any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
