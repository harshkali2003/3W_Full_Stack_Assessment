import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CircularProgress,
  Box,
} from "@mui/material";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Feed = () => {
  const { logout } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/post/all");

      setPosts(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Social Feed
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <CreatePost onPostCreated={fetchPosts} />

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
          ))
        )}
      </Container>
    </>
  );
};

export default Feed;
