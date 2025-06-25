import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useUserSignInMutation } from "../../../CustomHooks/auth.query.hooks";
import { useRouter } from "next/router";
import { useNetworkCheck } from "@/Offline";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface IFormInput {
  email: string;
  password: string;
}

interface ILoginProps {
  val: string;
}

const Login: React.FC<ILoginProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: any) => {
    event.preventDefault();
  };

  const router = useRouter();
  const { isOnline } = useNetworkCheck();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { mutate, isPending } = useUserSignInMutation();


  const onSubmit = (formData: { email: string; password: string }) => {
    const formdata = new FormData();
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    mutate(formdata);
    router.push("/cms/list");
  };

  return (
    <Container style={{ height: "70vh", paddingTop: "22vh" }}>
      {isOnline ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid email format",
                    },
                  })}
                  label="Your Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />
                <TextField
                  {...register("password", {
                    required: "Password is required",
                  })}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className="icon"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                />

                <Button
                  variant="contained"
                  disabled={isPending}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  sx={{
                    marginTop: 2,
                    fontSize: "18px",
                    backgroundColor: "#E6B9A6",
                    "&:hover": {
                      backgroundColor: "#EEEDEB",
                      color: "#E6B9A6",
                    },
                  }}
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                <p
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  Don't have an Account?
                  <a
                  href = "/auth/register"
                    style={{
                      color: "#E6B9A6",
                      cursor: "pointer",
                    }}
                  >
                    <b> Sign Up</b>
                  </a>
                </p>
              </form>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <h1>YOU ARE OFFLINE</h1>
      )}
    </Container>
  );
};

export default Login;
