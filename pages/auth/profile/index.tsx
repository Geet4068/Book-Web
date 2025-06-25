import { profile_pic } from "@/Api/Axios/Axios";
import { useUserProfileDetails } from "@/CustomHooks/auth.query.hooks";
import Loader from "@/Loading/loading";
import AspectRatio from "@mui/joy/AspectRatio";
import { Button, Card, Container, Paper } from "@mui/material";

const ProfileDetails = () => {
  const { data, isPending } = useUserProfileDetails();
  const userDetails: any = data?.data;
  // if (userDetails){
  //     // const {first_name, last_name, email} = userDetails
  //     const fname = userDetails.first_name;
  //     const lname = userDetails.last_name;
  //     const email = userDetails.email;
  //     const proPic = userDetails.profile_pic;
  //     console.log(fname, lname, email, proPic);

  // }

  if (isPending) return <Loader />;
  return (
    <>
      <Container sx={{ height: "70vh", textAlign: "center", paddingTop:"6rem", display:"flex", justifyContent:"center" }}>
        {userDetails ? (
          <Paper className="trans-bg">
            <div style={{marginBottom:"40px"}}>
              <h1 style={{ margin: "5rem", fontSize:"2.8rem"}}>
                Your Profile:
              </h1>
              <div
               style={{ display: "flex", justifyContent: "left", alignItems:"center" }}
               >
                <div>
                  {/* <AspectRatio 
                  maxHeight={400}
                  minHeight={300}
                  > */}
                    <img style={{height:"200px", boxShadow:"2px", borderRadius:"50px", marginLeft:"280px"}} src={profile_pic(userDetails.profile_pic)} />
                  {/* </AspectRatio> */}
                </div>
                <div style={{textAlign:"left", fontSize:"1.5rem", marginLeft:"50px"}}>
                  <p style={{border:"1px solid grey", padding:"5px 20px", borderRadius:"20px"}}>Name: {userDetails.first_name} {userDetails.last_name}</p>
                  <p style={{border:"1px solid grey", padding:"5px 20px", borderRadius:"20px"}}>Email Id: {userDetails.email}</p>
                </div>
              </div>
            </div>
          </Paper>
        ) : (
          <div style={{ marginTop: "15rem" }}>
            <p style={{color:"white", fontSize:"25px"}}>You're not logged in</p>
            <Button
              href="/auth/login"
              sx={{
                fontSize: "1.7rem",
                // width: "80%",
                fontWeight: 600,
                color: "white",
                backgroundColor: "#E6B9A6",
                marginTop: "4rem",
                padding: "8px 20px",
                ":hover": { scale: "1.2", color:"white" },
              }}
            >
              Log in
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProfileDetails;
