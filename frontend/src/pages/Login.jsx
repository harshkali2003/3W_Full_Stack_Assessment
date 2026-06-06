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
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", formData);

      const token = response?.data?.token;

      if (!token) {
        throw new Error("Token not received");
      }

      login(token);

      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
            Welcome Back{" "}
          </Typography>
          ```
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Login to your account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit}>
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
                "Login"
              )}
            </Button>
          </Box>
          <Typography align="center" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
