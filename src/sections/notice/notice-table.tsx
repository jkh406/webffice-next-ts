import { Avatar, Box, Card, Checkbox, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography, CardContent  } from '@mui/material';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { applyPagination } from 'utils/apply-pagination';
import { useSelection } from 'hooks/use-selection';
import { FC } from 'react';


interface CustomTableProps {
  item: any;
}

export const NoticeTable: FC<CustomTableProps> = ({ item } : any) => {
  const useUserManagement = (page : any, rowsPerPage : any) => {
    return useMemo(
      () => {
        return applyPagination(item, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };
  
  const useUserManagementIds = (users : any) => {
    return useMemo(
      () => {
        return users.map((users : any) => users.id);
      },
      [users]
    );
  };
  
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const users = useUserManagement(page, rowsPerPage);
  const usersIds = useUserManagementIds(users);
  const usersSelection = useSelection(usersIds);
  const onDeselectAll = usersSelection.handleDeselectAll;
  const onDeselectOne = usersSelection.handleDeselectOne;
  const onSelectAll = usersSelection.handleSelectAll;
  const onSelectOne = usersSelection.handleSelectOne;
  const selected = usersSelection.selected;
  const selectedSome = (selected.length > 0) && (selected.length < users.length);
  const selectedAll = (users.length > 0) && (selected.length === users.length);

  return (
    <Card >
        <Box sx={{ minWidth: 800}} >
          <Table >
            <TableHead >
              <TableRow >
                <TableCell style={{ width: '10%' }}>
                  말머리
                </TableCell>
                <TableCell style={{ width: '50%' }}>
                  제목
                </TableCell>
                <TableCell style={{ width: '10%' }}>
                  작성자
                </TableCell>
                <TableCell style={{ width: '10%' }}>
                  작성일
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((users : any) => {
                const isSelected = selected.includes(users.id);

                return (
                  <TableRow
                    hover
                    key={users.id}
                    selected={isSelected}
                  >
                    <TableCell>
                      {users.address}, {users.detail_address}
                    </TableCell>
                    <TableCell>  
                      {users.email}
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={users.avatar}>
                        </Avatar>
                        <Typography variant="subtitle2">
                          {users.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {users.phone}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      <TablePagination
        component="div"
        count={item?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
