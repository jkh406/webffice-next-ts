import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard-layout';
import { UsersTable } from 'sections/admin/admin-table';
import { CustomersSearch } from 'sections/admin/admin-search';
import { useUserRole } from 'hooks/use-userrole'
import { useRouter } from 'next/router';
import { AdminNav } from 'layouts/admin-nav';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'hooks/use-auth';
import { SelectUser } from "store/slice/admin-slice"
import { useCookie } from 'utils/cookie';

const Page = () => {
  const adminSlice = useAppSelector((state : any) => state.admin.user_detail);
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const userRole = useUserRole();
  const router = useRouter();
  const pathname = usePathname();
  const { auth } = useCookie();
  
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
    if (user.user) {
      dispatch(SelectUser((user.token)));
      console.log('adminSlice', adminSlice);
    }
    else {
      dispatch(SelectUser((auth)));
    }
    
    handlePathnameChange();

  }, [userRole, pathname, dispatch]);

  const [openNav, setOpenNav] = useState(false);

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
            <CustomersSearch />
            <UsersTable adminslice={adminSlice}/>
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
