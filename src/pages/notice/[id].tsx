import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from 'layouts/dashboard-layout';
import Head from 'next/head';
import { Box, Container, Stack, Typography, CardContent, Card, CardHeader, Divider, Avatar, IconButton, MenuList, MenuItem, Popover, SvgIcon } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { usePopover } from 'hooks/use-popover';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from 'hooks/use-auth';
import { DeleteBoard, CreateComments } from "store/slice/board-slice";
import { useCookie } from 'utils/cookie';
import CommentForm from 'hooks/use-commentform';
import { getBoardCommentsApi } from 'service/board-api';

const Page = () => {
  const { auth } = useCookie();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accountPopover = usePopover();
  const [customRouter, setCustomRouter] : any = useState({});
  const [comments, setComments] : any = useState([]);

  const handleCommentSubmit = (comment : any) => {
    const params = { 
      title: comment,
      root_board_no: customRouter.board_no,
      token: auth
    };
    dispatch(CreateComments(params));
    setComments([...comments, comment]);
  };

  useEffect(() => {
    const storedRouter = localStorage.getItem("customRouter");
    if (storedRouter) {
      setCustomRouter(JSON.parse(storedRouter));
    }

    const fetchData = async () => {
      try {
        const params = {
          root_board_no: customRouter.board_no,
          token: auth
        };
        const response = await getBoardCommentsApi(params, params.token);
        const payload = response.data.data;
        console.log('payload', payload)
        setComments(payload);
      } catch (error: any) {
        console.error(error);
      }
    };
  
    fetchData();
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
    <title>Write | A&B Technology</title>
  </Head>
  <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <div>
          <Typography variant="h4">공지사항</Typography>
        </div>
          <Card>
            <CardHeader
              avatar={<Avatar src={customRouter.avatar}></Avatar>}
              action={
                <IconButton
                  aria-label="settings"
                  onClick={accountPopover.handleOpen}
                  ref={accountPopover.anchorRef}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              title={customRouter.board_title}
              subheader={customRouter.reg_tm}
            />
            <Divider />
            <CardContent sx={{ pt: 4, minHeight: '800px' }}>
              <Stack spacing={3} sx={{ maxWidth: 1200 }}>
                <CardContent sx={{ pt: 4, height: '500px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {customRouter.board_content}
                  </Typography>
                </CardContent>
                <Divider />
              </Stack>
              <Box sx={{ p: 2, height: '100%' }}>
                {comments.length > 0 ? (
                  comments.map((comment : any) => (
                    <Box key={comment.BOARD_NO} sx={{ mt: 2 }}>
                      <Card sx={{ minHeight: '100px' }}>
                        <CardHeader
                        avatar={<Avatar src={customRouter.avatar}></Avatar>}
                        title={comment.USER_NAME}
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }>
                        </CardHeader>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                      {comment.BOARD_TITLE}
                      </Typography>
                    </CardContent>
                      </Card>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ mt: 2 }}>
                    등록된 댓글이 없습니다.
                  </Typography>
                )}
                <Box sx={{ mt: 2 }}>
                  <CommentForm onSubmit={handleCommentSubmit} />
                </Box>
              </Box>
            </CardContent>
          </Card>
      </Stack>
    </Container>
  </Box>
  <Popover
    anchorEl={accountPopover.anchorRef.current}
    anchorOrigin={{
      horizontal: 'left',
      vertical: 'bottom',
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
          borderRadius: 1,
        },
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <MenuItem onClick={handleUpdate}>수정하기</MenuItem>
        <SvgIcon fontSize="small">
          <EditIcon />
        </SvgIcon>
      </Stack>
      <Divider />
      <Stack direction="row" spacing={1} alignItems="center">
        <MenuItem style={{ color: 'red' }} onClick={handleDelete}>
          삭제하기
        </MenuItem>
        <SvgIcon fontSize="small" style={{ color: 'red' }}>
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