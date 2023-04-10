import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard-layout';
import { CustomSchedule } from 'sections/schedule/schedule-calendar';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/use-auth';
import { SelectSchedule } from "store/slice/schedule-slice"
import { useCookie } from 'utils/cookie';

const Page = () => {
  const scheduleslice = useAppSelector((state : any) => state.schedule.board);
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { auth, setAuthCookie } = useCookie();

  useEffect( () => {
    if (user.user) {
      localStorage.setItem('user', JSON.stringify(user.user));
      setAuthCookie(user.token);
      
      const schedule = { user_ID: user.user_ID, token: user.token };
      dispatch(SelectSchedule((schedule)));
    } 
    else {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const schedule = { user_ID: storedUser?.user_ID, token: auth };
      dispatch(SelectSchedule((schedule)));
    }
  },[dispatch, user.user]);
  
  return (
  <>
      <Head>
        <title>
          Schedules | A&B Technology
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                    일정관리
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
            </Stack>
            <CustomSchedule scheduleslice={scheduleslice}/>
          </Stack>
        </Container>
      </Box>
    </>
)
};

Page.getLayout = (page : any) => (
  <DashboardLayout >
    {page}
  </DashboardLayout>
);

export default Page;
