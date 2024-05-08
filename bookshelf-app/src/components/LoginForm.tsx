import React, { useState } from "react";
import { useCreateUserMutation } from "../redux/apiSlice";
import { signinUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const [createUser] = useCreateUserMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      key: key,
      secret: secret,
    };

    createUser(user);
    dispatch(signinUser({ key: key, secret: secret }));
  };

  return (
    <div className="login-form">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "50%",
            "@media (max-width: 768px)": {
              width: "90%",
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" margin={2}>
                SIGN UP
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Key"
                      variant="outlined"
                      fullWidth
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Secret"
                      variant="outlined"
                      fullWidth
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};
