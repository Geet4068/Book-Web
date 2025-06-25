import {
  DetailsQuery,
  GetLandingDetails,
  useDetailsMutation,
  useProductUpdateMutation,
} from "@/CustomHooks/cms.query.hooks";
import { ILandingPageList } from "@/Interface/cms.interface";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UpdateProps {
  id: string;
}

const Update: React.FC<UpdateProps> = () => {
  const [img, setImg] = useState<File | null>(null);
  const router = useRouter();
  const { slug } = router.query;
  const { mutate } = useProductUpdateMutation();
  const { isPending, data, isError } = useDetailsMutation(slug as string);
  // console.log(data);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILandingPageList>();
  // console.log(mutate);

  useEffect(() => {
    if (!isPending && !isError && data) {
      setValue("title", data.title);
      setValue("description", data.description);
    }
  }, [data, setValue, isPending, isError]);

  const sendData = async (e: ILandingPageList) => {
    const formdata = new FormData();
    formdata.append("id", slug as string);
    formdata.append("title", e.title);
    formdata.append("description", e.description);
    if (img) {
      formdata.append("image", img);
    }

    mutate(formdata, {
      onSuccess: () => {
        console.log("Product created successfully");
        router.push("/cms/list");
      },
    });
  };

  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "70vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
            <Paper elevation={2} sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>
                Edit Your Booklist:
              </Typography>
              <form>
                <TextField
                  {...register("title", {
                    required: "Title is required",
                  })}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title && "Title is required"}
                />
                <TextField
                  {...register("description", {
                    required: "Description is required",
                    maxLength: 50,
                  })}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.description}
                  helperText={errors.description && "Description is required"}
                />

                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ color: "black" }}
                >
                  Image
                </Typography>
                <div className="mb-3">
                  <input
                    type="file"
                    onChange={(e) =>
                      setImg(e.target.files ? e.target.files[0] : null)
                    }
                    name="img"
                    accept="image/*"
                    className="form-control"
                  />

                  {img ? (
                    <img
                      height="60px"
                      src={URL.createObjectURL(img)}
                      alt="Preview"
                      className="upload-img"
                    />
                  ) : (
                    data?.image && (
                      <img
                        style={{ marginTop: "10px" }}
                        height="90px"
                        src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${data.image}`}
                        alt="Existing"
                        className="upload-img"
                      />
                    )
                  )}
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(sendData)}
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
                  size="large"
                  type="submit"
                >
                  {isPending ? "Updating Booklist..." : "Update"}
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
    </div>
  );
};
export default Update;
