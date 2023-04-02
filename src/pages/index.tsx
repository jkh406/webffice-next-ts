import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard/dashboard-layout';
import { CustomSchedule } from 'sections/schedule/schedule-calendar';

const now = new Date();

const Page = () => (
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
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomSchedule />
          </Stack>
        </Container>
      </Box>
    </>
);

Page.getLayout = (page : any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
