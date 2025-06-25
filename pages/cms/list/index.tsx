import {
  listQuery,
  useProductDeleteMutation,
} from "@/CustomHooks/cms.query.hooks";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import demo from "../../../Images/po.jpg";
import { product } from "@/Api/Axios/Axios";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast } from "react-toastify";
import SweetAlertComponent from "@/SweetAlert/sweetalert";
import { useNetworkCheck } from "@/Offline";
import Loader from "@/Loading/loading";
import { useRouter } from "next/router";
import AspectRatio from "@mui/joy/AspectRatio";

export default function List() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const perPage = 6;
  const { data, isPending } = listQuery(page, perPage);
  console.log("DATA", data);

  const [modal, setModal] = useState(false);
  const [id, setIdValue] = useState<number | undefined>(undefined);
  const [toggle, settoggle] = useState(false);
  const products = data?.data.data;
  const tp = data?.data.totalPages;
  console.log("tp:", tp);
  console.log("DATA: ", products);

  const deleted = useProductDeleteMutation();
  const { isOnline } = useNetworkCheck();
  const handleNextPage = () => {
    if (page >= 1) {
      setPage((prevPage) => prevPage + 1);
    } else {
      toast.info("You're on the last page");
    }
  };
  console.log(page, "nextpage");
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      toast.info("You're on the first page");
    }
  };

  const toggling = () => {
    settoggle(!toggle);
  };

  const sendData = (id: number) => {
    deleted.mutate({ id });
    setModal(false);
  };

  if (isPending) return <Loader />;
  return (
    <>
      {!isOnline ? (
        <div
          style={{ textAlign: "center", paddingTop: "30px", height: "100%" }}
        >
          <h1 style={{ color: "grey" }}>You're Offline</h1>
        </div>
      ) : (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "50vh",
            // height: "100vh",
          }}
        >
          {/* <h1>{Array.isArray(data)? "Product List":"No Products to Display"}</h1> */}

          {Array.isArray(products) && products.length > 0 ? (
            <h1 style={{ margin: "5rem", color: "lightgrey" }}>
              Your Book List:
            </h1>
          ) : (
            <span style={{ margin: "5rem", color: "lightgrey" }}>
              No Products to Display.
            </span>
          )}
          <Button
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "15px",
              padding: "10px 40px",
              marginBottom: "40px",
              ":hover": { scale: "1.2" },
            }}
            onClick={() => {
              toggling();
            }}
          >
            {toggle ? "Show as Card" : "Show as Table"}
          </Button>

          {toggle ? (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  minHeight: "100vh",
                  backgroundColor: "transparent",
                  backdropFilter: "blur(25px)",
                }}
              >
                <Table sx={{ Width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        TITLE
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        DESCRIPTION
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        IMAGE
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        OPTIONS
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(products) &&
                      products?.map((item) => (
                        <TableRow
                          key={item._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ color: "white", fontSize: "18px" }}
                          >
                            {item.title}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ color: "white", fontSize: "18px" }}
                          >
                            {item.description}
                          </TableCell>
                          <TableCell align="right" height="00px">
                            <AspectRatio>
                              <img
                                src={
                                  item.image
                                    ? product(item.image)
                                    : "https://t4.ftcdn.net/jpg/03/02/74/89/360_F_302748918_Vs76DTDodjhhkYuCEFahu0LcoDZkBuaW.jpg"
                                }
                                alt="Error"
                                // height="180px"
                                // width="120px"
                              />
                            </AspectRatio>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              onClick={() => {
                                setIdValue(item._id);
                                setModal(true);
                              }}
                            >
                              Delete
                            </Button>
                            <br />
                            <Button
                              variant="contained"
                              href={`/cms/list/${item._id}`}
                              style={{
                                backgroundColor: "Green",
                                marginTop: "10px",
                              }}
                            >
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {Array.isArray(products) &&
                products?.map((item) => (
                  <Card
                    key={item._id}
                    sx={{
                      maxWidth: 285,
                      minWidth: 280,
                      margin: 2,
                      ":hover": {
                        boxShadow: 18,
                        // height: 400,
                        // width: 310,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt=""
                      height="300"
                      image={
                        item.image
                          ? product(item.image)
                          : "https://t4.ftcdn.net/jpg/03/02/74/89/360_F_302748918_Vs76DTDodjhhkYuCEFahu0LcoDZkBuaW.jpg"
                      }
                    />
                    <CardContent sx={{ backgroundColor: "#EEEDEB" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "17px" }}>
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ backgroundColor: "#EEEDEB" }}>
                      <Button variant="outlined" sc={{ marginRight: "8px" }}>
                        <Link
                          href={`/cms/list/${item._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          Update
                        </Link>
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setIdValue(item._id);
                          setModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                ))}
            </div>
          )}

          {/* PAGINATION */}
          {products && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                color: "white",
                margin: "6rem",
              }}
            >
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
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span>
                Page {page} of {tp}
              </span>
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
                onClick={handleNextPage}
                disabled={page === tp}
              >
                Next
              </Button>
            </div>
          )}

          <Button
            variant="contained"
            component="span"
            onClick={() => router.push("/cms/create")}
            sx={{
              backgroundColor: "#E6B9A6",
              fontSize: "20px",
              padding: "1rem 6rem",
              "&:hover": {
                backgroundColor: "#EEEDEB",
                color: "#E6B9A6",
              },
            }}
          >
            Add Books
          </Button>

          {modal && (
            <SweetAlertComponent
              confirm={() => {
                if (id !== undefined) {
                  sendData(id);
                } else {
                  console.error("ID is undefined");
                }
              }}
              cancel={() => setModal(false)}
              title={"Are you sure?"}
              subtitle={"You will not be able to recover!"}
            />
          )}
        </Container>
      )}
    </>
  );
}
