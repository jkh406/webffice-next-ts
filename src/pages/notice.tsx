import Head from 'next/head';
import { Box, Stack, TableCell, TableHead, Typography, Button, SvgIcon } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard-layout';
import GridTable  from 'components/react-grid-table/index';
import axios from 'axios';
import { useState } from 'react';
import { useCookie } from 'utils/cookie';
import { useColumnValues } from 'hooks/use-columnvalue';
import { getBoardListApi } from 'service/board-api';
import NextLink from 'next/link';
import Link from 'next/link'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { useAppDispatch, useAppSelector } from 'hooks/use-auth';
import { getBoardLists, selectBoard } from "store/slice/board-slice"

export async function getServerSideProps(context : any) {
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
  
  const columns = await useColumnValues("Notice", result.auth);
  
  return {
    props: {
      columns,
    },
  };
}

const Page = ({columns} : any) => {
  const { auth } = useCookie();
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(null);

  const onRowsRequest = async (requestData : any) => {
    const params = {
      startPage: requestData.from,
      pageNum: requestData.to,
      searchText: requestData.searchText,
      sortOrder: requestData.sort.colId == null ? "DESC" : (requestData.sort.isAsc === true ? "ASC" : "DESC"),
      token: auth
    };
    const response = await getBoardListApi(params, auth);
    const responseData = response.data

    if(!responseData) return;

    return {
      rows: responseData.data.Boards,
      totalRows: responseData.data.Limit
    };
  };

  const columnsWithCellRenderer = columns.map((column: any) => {
    if (column.cellRenderer) {
      return {
        ...column,
        cellRenderer: ({ data }: any) => (
          <Link href= {{
                  pathname: `notice/${encodeURIComponent(data.BOARD_NO)}`,
                  query: { 
                    board_no: JSON.stringify(data.BOARD_NO),
                    user_name : JSON.stringify(data.BOARD_NO),
                    board_title : JSON.stringify(data.BOARD_TITLE),
                    board_content : JSON.stringify(data.BOARD_CONTENT),
                    reg_tm : JSON.stringify(data.REG_TM),
                    avatar : JSON.stringify(data.AVATAR),
                   }
                }}
                as={`notice/${encodeURIComponent(data.BOARD_NO)}`} >
            {data.BOARD_TITLE}
          </Link>
        ),
      };
    } else {
      return column;
    }
  });

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
            <Stack spacing={4}>
            <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                공지사항
              </Typography>
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
            <div>
              <Button component={NextLink} href="notice/write"
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
              <Stack>
                <GridTable         
                  onRowsRequest={onRowsRequest}
                  onTotalRowsChange={setTotalRows}
                  onRowsChange={setRows}
                  columns={columnsWithCellRenderer}
                  rows={rows}
                  totalRows={totalRows}
                />
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
