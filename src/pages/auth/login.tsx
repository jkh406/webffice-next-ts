import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, FormHelperText, Link, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useAppDispatch } from 'hooks/use-auth';
import { LoginUser, Skip, login, logout } from 'store/slice/auth-slice';
import { useCookie } from 'utils/cookie';


const Page = () => {
  const { auth, setAuthCookie } = useCookie();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [method, setMethod] = useState('email');
  const formik = useFormik({
    initialValues: {
      user_Id: 'admin@anbtech.co.kr',
      password: 'admin',
      submit: null
    },
    validationSchema: Yup.object({
      user_Id: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await dispatch(LoginUser({
          user_Id: values.user_Id,
          user_Pw: values.password
        }));
        router.push('/');
      } catch (err : any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  

  const handleMethodChange = useCallback(
    (event : any, value : any) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      dispatch(Skip);
      router.push('/');
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>
          Login | A&B Technology
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                계정을 생성하시겠습니까?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Email"
                value="email"
              />
              <Tab
                label="Phone Number"
                value="phoneNumber"
              />
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.user_Id && formik.errors.user_Id)}
                    fullWidth
                    helperText={formik.touched.user_Id && formik.errors.user_Id}
                    label="Email Address"
                    name="user_Id"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.user_Id}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  이메일 및 패스워드를 입력하세요.
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Account Skip
                </Button>
                <Alert
                  color="info" 
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    관리자 ID <b>admin@anbtech.co.kr</b> 패스워드 <b>admin</b>
                  </div>
                </Alert>
              </form>
            )}
            {method === 'phoneNumber' && (
              <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant="h6"
                >
                  미 구현
                </Typography>
                <Typography color="text.secondary">
                  미 구현.
                </Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Page;
