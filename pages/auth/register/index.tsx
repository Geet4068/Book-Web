import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useUserSignUpMutation } from "../../../CustomHooks/auth.query.hooks";
import { IRegisterResponse } from "@/Interface/auth.interface";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// interface IFormInput {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
// }

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: any) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterResponse>();

  const { mutate, isPending } = useUserSignUpMutation();
  const [img, setImg] = useState<File | null>(null);

  const onSubmit = (formData: IRegisterResponse) => {
    const formdata = new FormData();
    formdata.append("first_name", formData.first_name);
    formdata.append("last_name", formData.last_name);
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    formdata.append("profile_pic", img);
    mutate(formdata);
  };

  // console.log(isPending, "isPending");
  return (
    <Container style={{ height: "100vh", paddingTop: "13vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Create a New Account :
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("first_name", {
                  required: "First name is required",
                })}
                label="First Name"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
              <TextField
                {...register("last_name", {
                  required: "last_name is required",
                })}
                label="Last Name"
                type="last_name"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
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
              <input
                accept="image/*"
                id="upload-button"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => e.target.files && setImg(e.target.files[0])}
              />
              <label htmlFor="upload-button">
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  sx={{
                    backgroundColor: "#E6B9A6",
                    "&:hover": {
                      backgroundColor: "#EEEDEB",
                      color: "#E6B9A6",
                    },
                  }}
                >
                  Upload
                </Button>
              </label>
              {img ? (
                <Box mt={2}>
                  <img
                    style={{ height: "180px" }}
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="upload-img"
                  />
                </Box>
              ) : (
                <Box mt={2}>
                  <p>Drag or drop content here</p>
                </Box>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                sx={{
                  marginTop: 2,
                  fontSize: "18px",
                  fontWeight: "bold",
                  backgroundColor: "#E6B9A6",
                  "&:hover": {
                    backgroundColor: "#EEEDEB",
                    color: "#E6B9A6",
                  },
                }}
              >
                {isPending ? "Loading..." : "Create Account"}
              </Button>
              <p
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  Already have an Account?
                  <a
                  href = "/auth/login"
                    style={{
                      color: "#E6B9A6",
                      cursor: "pointer",
                    }}
                  >
                    <b> Sign In</b>
                  </a>
                </p>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
