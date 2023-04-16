import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from 'layouts/dashboard-layout';
import Head from 'next/head';
import { Box, Container, Stack, Typography, CardContent, Card, CardHeader, TextField, Paper, Divider, CardActions, Button, Avatar, IconButton, IconButtonProps, MenuList, MenuItem, Popover, SvgIcon } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { usePopover } from 'hooks/use-popover';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from 'hooks/use-auth';
import { DeleteBoard } from "store/slice/board-slice";
import { useCookie } from 'utils/cookie';

const Page = () => {
  const { auth } = useCookie();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accountPopover = usePopover();
  const [customRouter, setCustomRouter] : any = useState({});

  useEffect(() => {
    const storedRouter = localStorage.getItem("customRouter");
    if (storedRouter) {
      setCustomRouter(JSON.parse(storedRouter));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customRouter", JSON.stringify(customRouter));
  }, [customRouter]);

  for (const [key, value] of Object.entries(router.query)) {
    if (Array.isArray(value)) {
      customRouter[key] = value.map((val) => val.replace(/"/g, ""));
    } else {
      customRouter[key] = value ? value.replace(/"/g, "") : null;
    }
  }
  
  const handleDelete = useCallback(
    () => {
      const params = { 
        board_no: customRouter.board_no,
        token: auth
      };
      dispatch(DeleteBoard(params));
      router.push('/notice');
    },
    [router]
  );

  const handleUpdate = useCallback(
    () => {
      router.push('/notice/update');
    },
    [router]
  );

  return (
    <>
    <Head>
      <title>
        Write | A&B Technology
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              공지사항
            </Typography>
          </div>
          
          <form
                noValidate
              >
            <Card>
                <CardHeader avatar={
                  
                <Avatar 
                src={customRouter.avatar} >
                </Avatar>
                }
                action={
                  <IconButton aria-label="settings" 
                    onClick={accountPopover.handleOpen}
                    ref={accountPopover.anchorRef}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title= {customRouter.board_title}
                subheader={customRouter.reg_tm}>
                </CardHeader>
                  <Divider />
                <CardContent sx={{ pt: 4, height:'700px' }}>
                    <Stack
                        spacing={3}
                        sx={{ maxWidth: 1200 }}
                    >
                            <CardContent sx={{ pt: 4, height:'500px' }}>
                              <Typography variant="body2" color="text.secondary">
                              {customRouter.board_content}
                              </Typography>
                            </CardContent>
                        <Divider />
                    </Stack>
                </CardContent>
            </Card>
            </form>
        </Stack>
      </Container>
    </Box>
    <Popover
      anchorEl={accountPopover.anchorRef.current}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={accountPopover.handleClose}
      open={accountPopover.open}
      PaperProps={{ sx: { width: 140 } }}
    >
  <MenuList
      disablePadding
      dense
      sx={{
        p: '8px',
        '& > *': {
          borderRadius: 1
        }
      }}
    >
    <Stack direction="row" spacing={1} alignItems="center">
      <MenuItem onClick={handleUpdate}>
      수정하기
      </MenuItem>
      <SvgIcon fontSize="small">
        <EditIcon />
      </SvgIcon>
    </Stack>
    <Divider />
    <Stack direction="row" spacing={1} alignItems="center">
      <MenuItem style={{ color: "red" }} onClick={handleDelete}>
      삭제하기
      </MenuItem>
      <SvgIcon fontSize="small" style={{ color: "red" }}>
        <DeleteIcon />
      </SvgIcon>
    </Stack>
  </MenuList>

    </Popover>


  </>
  )
};

Page.getLayout = (page : any) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
export default Page;