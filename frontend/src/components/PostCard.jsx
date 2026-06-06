import { useState } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

import api from "../api/axios";
import CommentModal from "./CommentModal";

const PostCard = ({ post, refreshPosts }) => {
  const [openComments, setOpenComments] = useState(false);

  const handleLike = async () => {
    try {
      await api.post(`/like/like/${post._id}`);

      if (refreshPosts) {
        refreshPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const imageUrl = post.filename
    ? `${import.meta.env.VITE_API_URL}/uploads/${post.filename}`
    : null;

  return (
    <>
      <Card sx={{ mb: 3 }}>
        {imageUrl && (
          <CardMedia component="img" image={imageUrl} alt="Post" height="350" />
        )}

        <CardContent>
          <Typography variant="h6" gutterBottom>
            {post.username}
          </Typography>

          {post.content && (
            <Typography sx={{ mb: 2 }}>{post.content}</Typography>
          )}

          <Typography sx={{ mb: 1 }}>
            Likes: {post.likes?.length || 0}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Comments: {post.comments?.length || 0}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button variant="contained" onClick={handleLike}>
              Like
            </Button>

            <Button variant="outlined" onClick={() => setOpenComments(true)}>
              Comments
            </Button>
          </Box>
        </CardContent>
      </Card>

      <CommentModal
        open={openComments}
        handleClose={() => setOpenComments(false)}
        postId={post._id}
        refreshPosts={refreshPosts}
      />
    </>
  );
};

export default PostCard;
