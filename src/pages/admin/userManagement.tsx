import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'hooks/use-selection';
import { DashboardLayout } from 'layouts/dashboard-layout';
import { CustomersTable } from 'sections/admin/admin-table';
import { CustomersSearch } from 'sections/admin/admin-search';
import { applyPagination } from 'utils/apply-pagination';
import { useUserRole } from 'hooks/use-userrole'
import { useRouter } from 'next/router';
import { AdminNav } from 'layouts/admin-nav';
import { usePathname } from 'next/navigation';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
];

const useUserManagement = (page : any, rowsPerPage : any) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useUserManagementIds = (users : any) => {
  return useMemo(
    () => {
      return users.map((customer : any) => customer.id);
    },
    [users]
  );
};

const Page = () => {
  const userRole = useUserRole();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    handlePathnameChange();

    if(userRole && userRole !== 'ADMIN')
    {         
      router
        .replace({
          pathname: '/auth/login',
          query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
        })
        .catch(console.error);
    }
  }, [userRole, pathname]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const users = useUserManagement(page, rowsPerPage);
  const usersIds = useUserManagementIds(users);
  const usersSelection = useSelection(usersIds);
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  const handlePageChange = useCallback(
    (event : any, value : any) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event : any) => {
      setRowsPerPage(event.target.value);
    },
    []
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
            <CustomersTable
              count={data.length}
              items={users}
              onDeselectAll={usersSelection.handleDeselectAll}
              onDeselectOne={usersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={usersSelection.handleSelectAll}
              onSelectOne={usersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={usersSelection.selected}
            />
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
