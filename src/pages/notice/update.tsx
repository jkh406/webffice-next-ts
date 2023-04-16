import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from 'layouts/dashboard-layout';
import Head from 'next/head';
import { useFormik } from 'formik';
import { Box, Container, Stack, Typography, CardContent, Grid, Card, CardHeader, TextField, Paper, Divider, CardActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UpdateBoard } from "store/slice/board-slice";
import { useAppDispatch, useAppSelector } from 'hooks/use-auth';
import { useCookie } from 'utils/cookie';

const Page = () => {
  const { auth } = useCookie();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const storedRouter : any = localStorage.getItem("customRouter");
  const storedRouterParse = JSON.parse(storedRouter);
  
  const formik = useFormik({
    initialValues: {
      title: storedRouterParse.board_title,
      contents: storedRouterParse.board_content,
      submit: null
    },
    onSubmit: async (values, helpers) => {
      try {
        const params = { 
          title: values.title,
          contents: values.contents,
          board_no: storedRouterParse.board_no,
          token: auth
        };
        dispatch(UpdateBoard(params));

        router.push('/notice');
      } catch (err : any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  

  return (
    <>
    <Head>
      <title>
        Update | A&B Technology
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
                onSubmit={formik.handleSubmit}
              >
            <Card>
                <CardContent sx={{ pt: 4, height:'700px' }}>
                    <Stack
                        spacing={3}
                        sx={{ maxWidth: 1200 }}
                    >
                            <TextField
                                fullWidth
                                label="제목을 입력해주세요."
                                name="title"
                                required
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                            <TextField
                                fullWidth
                                label="본문을 입력해주세요."
                                name="contents"
                                required
                                multiline
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.contents}
                                rows={18}
                                />
                        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
          )}
          <Button variant="contained"
                  type="submit">
            저장
          </Button>
        </CardActions>
                    </Stack>
                </CardContent>
            </Card>
            </form>
        </Stack>
      </Container>
    </Box>
  </>
  )
};

Page.getLayout = (page : any) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
export default Page;