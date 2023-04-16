import React, { useState } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from 'layouts/dashboard-layout';
import Head from 'next/head';
import { ErrorMessage, Form, useFormik } from 'formik';
import { Box, Container, Stack, Typography, CardContent, Grid, Card, CardHeader, TextField, Paper, Divider, CardActions, Button } from '@mui/material';
import { CreateBoard } from "store/slice/board-slice";
import { useAppDispatch, useAppSelector } from 'hooks/use-auth';
import { useCookie } from 'utils/cookie';
import axios from "axios";
import  useFileUploader  from 'hooks/use-file';
import * as Yup from 'yup';

const UPLOAD_ENDPOINT = "C:\Users\jkh40\OneDrive\바탕 화면\react-ts\public\assets\file";

const Page = () => {
  const { auth } = useCookie();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      contents: '',
      file: null,
      profile: [],
      submit: null
    },
    onSubmit: async (values, helpers) => {
      try {
        console.log('values', values);
        const params = { 
          title: values.title,
          contents: values.contents,
          token: auth
        };
        dispatch(CreateBoard(params));
        router.push('/notice');

        let data = new FormData();
        values.profile.forEach((photo : any, index : any) => {
          data.append(`photo${index}`, values.profile[index]);
        });
        console.log('values data', data);
        axios.post(UPLOAD_ENDPOINT, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });


      } catch (err : any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

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
                        
<Stack direction="row" spacing={80} alignItems="center">
              <input
                id="file"
                name="profile"
                type="file"
                onChange={(event) => {
                  const files : any = event.target.files;
                  let myFiles =Array.from(files);
                  formik.setFieldValue("profile", myFiles);
                }}
                multiple
              />
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
      <Button variant="contained" sx={{ justifyContent: 'flex-end' }}
              type="submit">
        저장
      </Button>
    </CardActions>
</Stack>
                        
        
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