import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useUserProductCreateInMutation } from "@/CustomHooks/cms.query.hooks";
import { ICreatePayload } from "@/Interface/cms.interface";
import { useRouter } from "next/router";

const Create: React.FC = () => {
  const [img, setImg] = useState<File | null>(null);

  //   interface IFormInput {
  //     title: string;
  //     description: string;
  //     image: File;
  //   }
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePayload>();
  const { mutate, isPending } = useUserProductCreateInMutation();
  // console.log(mutate)

  const sendData = (formData: ICreatePayload) => {
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);

    if (img) {
      formdata.append("image", img);
    }

    mutate(formdata, {
      onSuccess: () => {
        // console.log("Product created successfully");
        router.push("/cms/create");
      },
      onError: (error: any) => {
        console.error("Error creating product", error);
      },
    });
  };

  return (
    <>
      <Container style={{ height: "90vh", paddingTop: "12vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>
                Make Your Our Personalised Booklist
              </Typography>
              <form>
                <TextField
                  {...register("title", {
                    required: true,
                    maxLength: 20,
                    minLength: 1,
                  })}
                  label="title"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title && " title is required"}
                />

                <TextField
                  {...register("description", {
                    required: true,
                    maxLength: 50,
                    minLength: 1,
                  })}
                  label="description"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.description}
                  helperText={errors.description && "description is required"}
                />

                <input
                  accept="image/*"
                  id="upload-button"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="upload-button">
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    fullWidth
                    sx={{
                      backgroundColor: "#E6B9A6",
                      fontSize: "14px",
                      marginTop: "12px",
                      "&:hover": {
                        backgroundColor: "#EEEDEB",
                        color: "#E6B9A6",
                      },
                    }}
                  >
                    Upload Image
                  </Button>
                </label>

                {img ? (
                  <Box mt={2}>
                    <img
                      style={{ height: "180px" }}
                      src={URL.createObjectURL(img)}
                      alt="Preview"
                      className="upload-img"
                    />
                  </Box>
                ) : (
                  <Box mt={2}>
                    <Typography sx={{ color: "geay", fontSize: "14px" }}>
                      Upload Image
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  disabled={isPending}
                  onClick={handleSubmit(sendData)}
                  sx={{
                    backgroundColor: "#E6B9A6",
                    fontSize: "18px",
                    marginTop: "12px",
                    "&:hover": {
                      backgroundColor: "#EEEDEB",
                      color: "#E6B9A6",
                    },
                  }}
                >
                  {isPending ? "Creating Booklist..." : "Create Booklist"}
                </Button>
              </form>
            </Paper>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                fullWidth
                variant="contained"
                component="span"
                onClick={() => router.push("/cms/list")}
                sx={{
                  marginTop: 6,
                  backgroundColor: "#E6B9A6",
                  fontSize: "18px",
                  padding: "10px 0rem",
                  "&:hover": {
                    backgroundColor: "#EEEDEB",
                    color: "#E6B9A6",
                  },
                }}
              >
                Go Back To Your Booklist
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Create;
