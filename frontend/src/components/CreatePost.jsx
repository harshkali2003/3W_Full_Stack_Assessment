import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import api from "../api/axios";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !file) {
      setError("Please provide content or image");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("content", content);

      if (file) {
        formData.append("filename", file);
      }

      await api.post("/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setContent("");
      setFile(null);

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 4 }}>
      {" "}
      <CardContent>
        {" "}
        <Typography variant="h6" gutterBottom>
          Create Post{" "}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="What's on your mind?"
            multiline
            rows={3}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button component="label" variant="outlined" sx={{ mb: 2 }}>
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>

          {file && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              {file.name}
            </Typography>
          )}

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Posting..." : "Create Post"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
