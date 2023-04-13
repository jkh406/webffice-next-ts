import Head from 'next/head';
import { Box, Stack, TableCell, TableHead, Typography } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard-layout';
import GridTable  from 'components/react-grid-table/index';
import axios from 'axios';
import { useState } from 'react';
import { useCookie } from 'utils/cookie';

const Username = ({ value, data } : any) => {
  return (
      <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
          <img src={data.AVATAR} alt="user avatar" />
          <span className='rgt-text-truncate' style={{marginLeft: 10}}>{value}</span>
      </div>
  )
}

const CustomCell = ({ value, data } : any) => {
  return (
      <div className='rgt-cell' style={{ alignItems: 'center'}}>
          <span className='rgt-text-truncate' style={{marginLeft: 10}}>{value}</span>
      </div>
  )
}

const CustomHeader = ({ value } : any) => {
  return (
      <div className='rgt-cell-header' style={{ alignItems: 'center'}}>
          <span className='rgt-text-truncate' style={{marginLeft: 10}}>{value}</span>
      </div>
  )
}
const columns = [
  {
      id: 1, 
      field: 'BOARD_NO', 
      label: '번호',
      width: "8%",
      className: "rgt-override",
      cellRenderer: CustomCell,
  }, 
  {
      id: 2, 
      field: 'BOARD_TYPE', 
      width: "10%",
      label: '분류',
      sortable: false,
      visible: true,
      cellRenderer: CustomCell,
      // headerCellRenderer: CustomHeader
  }, 
  {
      id: 3, 
      field: 'BOARD_TITLE', 
      label: '제목',
      width: "52%",
  }, 
  {
      id: 4, 
      field: 'USER_NAME', 
      label: '작성자',
      width: "10%",
      cellRenderer: Username,
  }, 
  {
      id: 5, 
      field: 'REG_TM', 
      label: '등록일',
      width: "10%",
      sort: ({ a, b, isAscending } : any) => {
          let aa = a.split('/').reverse().join(),
          bb = b.split('/').reverse().join();
          return aa < bb ? isAscending ? -1 : 1 : (aa > bb ? isAscending ? 1 : -1 : 0);
      }
  },
  {
      id: 6, 
      width: "10%",
      field: 'VIEW_CNT', 
      label: '조회',
      cellRenderer: CustomCell,
  },
];
const USER_API_BASE_URL = "http://localhost:8080/api/board";

const Page = () => {
  
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(null);
  const { auth } = useCookie();

  const onRowsRequest = async (requestData : any) => {
    const params = {
      startPage: requestData.from,
      pageNum: requestData.to,
      searchText: requestData.searchText,
      sortOrder: requestData.sort.colId == null ? "DESC" : (requestData.sort.isAsc === true ? "ASC" : "DESC")
    };
    console.log('requestData.sort.isAsc', requestData.sort);

    const response : any = await axios.post(USER_API_BASE_URL + "/readBoardLists", params, { 
      withCredentials: true,    
      headers: {
       Authorization: auth,
       },     
    });
    const responseData = response.data

    if(!responseData) return;

    return {
      rows: responseData.data.Boards,
      totalRows: responseData.data.Limit
    };
  };

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
              <GridTable         
                onRowsRequest={onRowsRequest}
                onTotalRowsChange={setTotalRows}
                onRowsChange={setRows}
                columns={columns}
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
