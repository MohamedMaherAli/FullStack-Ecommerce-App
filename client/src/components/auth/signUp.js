import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

//Just for early testing
const userEmails = ["1@gmail.com", "2@gmail.com", "3@gmail.com"];

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="/">
        Ecommerce App
      </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(4, "cannot be less than 4 characters")
        .max(15, "Cannot be more than 15 characters")
        .required("First Name Required"),
      lastName: Yup.string()
        .max(15, "Cannot be more than 15 characters")
        .required("Last Name Required"),
      email: Yup.string()
        .notOneOf(userEmails, "Email already Registered")
        .lowercase()
        .email()
        .required("Email Required"),
      password: Yup.string().required("Password Required"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwrod must match")
        .required("Confirm Password Required"),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(false);
      dispatch(signUp(values, navigate));
      resetForm();
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  error={
                    formik.touched.firstName && formik.errors.firstName
                      ? true
                      : false
                  }
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  autoComplete="off"
                  autoFocus
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  error={
                    formik.touched.lastName && formik.errors.lastName
                      ? true
                      : false
                  }
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  autoComplete="new-lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : null
                  }
                />
              </Grid>
            </Grid>

            <TextField
              error={formik.touched.email && formik.errors.email ? true : false}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete="new-email"
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
            <TextField
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              margin="normal"
              required
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
            />

            <TextField
              error={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
                  ? true
                  : false
              }
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              label="Confirm Password"
              type="password"
              id="passwordConfirm"
              autoComplete="new-password"
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
                  ? formik.errors.passwordConfirm
                  : null
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={formik.isSubmitting || !formik.isValid}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/auth/signin">Have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
