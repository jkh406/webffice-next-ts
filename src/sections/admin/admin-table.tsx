import { Avatar, Box, Card, Checkbox, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography, CardContent  } from '@mui/material';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { applyPagination } from 'utils/apply-pagination';
import { useSelection } from 'hooks/use-selection';
import { FC } from 'react';

interface CustomTableProps {
  adminslice: any;
}

export const UsersTable: FC<CustomTableProps> = ({ adminslice }) => {
  useEffect( () => {
  },[]);

  const useUserManagement = (page : any, rowsPerPage : any) => {
    return useMemo(
      () => {
        return applyPagination(adminslice, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };
  
  const useUserManagementIds = (users : any) => {
    return useMemo(
      () => {
        return users.map((users : any) => users.user_ID);
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
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
    <Card>
        <Box sx={{ minWidth: 800}} >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event : any) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Start in
                </TableCell>
                <TableCell>
                  rank
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((users : any) => {
                const isSelected = selected.includes(users.user_ID);

                return (
                  <TableRow
                    hover
                    key={users.user_ID}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event : any) => {
                          if (event.target.checked) {
                            onSelectOne?.(users.user_ID);
                          } else {
                            onDeselectOne?.(users.user_ID);
                          }
                        }}
                      />
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
                          {users.user_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {users.user_ID}
                    </TableCell>
                    <TableCell>
                      {users.address}, {users.detail_address}
                    </TableCell>
                    <TableCell>
                      {users.phone}
                    </TableCell>
                    <TableCell>
                      {users.start_date}
                    </TableCell>
                    <TableCell>
                      {users.rank}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      <TablePagination
        component="div"
        count={adminslice.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
