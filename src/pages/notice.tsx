import Head from 'next/head';
import { Box, Stack, Typography } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard-layout';
import { NoticeTable } from 'sections/notice/notice-table';
import axios from 'axios';

export async function getServerSideProps(context : any) {
  const USER_API_BASE_URL = "http://localhost:8080/api/board";
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
  const params = {
    startPage: 1,
    pageNum: 10,
  };
  const response = await axios.post(USER_API_BASE_URL + "/readBoardLists", params, { 
    withCredentials: true,    
    headers: {
     Authorization: result.auth,
     },     
  });

  const payload = response.data.map((rowData: any ) => ({
    writter : rowData.writter,
    title : rowData.title,
    boardId : rowData.boardId,
    create_date : rowData.create_date
  }));
  
  return {
    props: {
      item: payload,
    },
  };
}

const Page = ({item} : any) => {
  console.log('board item = ', item);
  return (
    <>
      <Head>
        <title>
          Notice | A&B Technology
        </title>
      </Head>
      
      <Box
        component="main"
        sx={{
          py: 3,
          px: 8
        }}
      >
          <Stack spacing={8}>
            <Stack>
              <Typography variant="h4">
              공지사항
              </Typography>
            </Stack>
            <Stack>
              <NoticeTable item={item} />
            </Stack>
          </Stack>
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
