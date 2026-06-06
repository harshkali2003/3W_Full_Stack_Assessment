import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    ```
try {
  setLoading(true);
  setError("");
  setSuccess("");

  const response = await api.post(
    "/auth/register",
    formData
  );

  setSuccess(
    response?.data?.message ||
      "Registration successful"
  );

  setTimeout(() => {
    navigate("/login");
  }, 1500);
} catch (err) {
  setError(
    err?.response?.data?.message ||
      err?.message ||
      "Registration failed"
  );
} finally {
  setLoading(false);
}
```;
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 3,
          }}
        >
          {" "}
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Create Account{" "}
          </Typography>
          ```
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Join the social community
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              required
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </Box>
          <Typography align="center" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
