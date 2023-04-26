import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from 'layouts/dashboard-layout';
import Head from 'next/head';
import { useFormik } from 'formik';
import { Box, Container, Stack, Typography, CardContent, Card, TextField, Divider, CardActions, Button } from '@mui/material';
import { CreateBoard } from "store/slice/board-slice";
import { useAppDispatch } from 'hooks/use-auth';
import { useCookie } from 'utils/cookie';
import  MyTextField  from 'hooks/use-dropzone';

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
        let formData = new FormData();
        const params = { 
          title: values.title,
          contents: values.contents,
        };
        values.profile.forEach((photo : any, index : any) => {
          formData.append("file", values.profile[index]);
        });
        formData.append("data", new Blob([JSON.stringify(params)],{type:"application/json"}));
        formData.append("token", auth);

        dispatch(CreateBoard(formData));

        router.push('/notice');
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
          <Card sx={{  minHeight:'700px' }}>
            <CardContent sx={{ pt: 4, minHeight:'700px' }}>
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
                <Stack direction="row" spacing={95} alignItems="center">
                  <input
                    id="file"
                    name="profile"
                    type="file"
                    onChange={(event) => {
                      const files : any = event.target.files;
                      let myFiles = Array.from(files);
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
                    <Button variant="contained" sx={{ justifyContent: 'flex-end' }} type="submit">
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