import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import api from "../api/axios";

const CommentModal = ({
  open,
  handleClose,
  postId,
  refreshPosts,
}) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    try {
      const response = await api.get(
        `/comment/get/${postId}`
      );

      setComments(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchComments();
    }
  }, [open]);

  const handleAddComment = async () => {
    try {
      if (!comment.trim()) return;

      await api.post(
        `/comment/create/${postId}`,
        {
          comment,
        }
      );

      setComment("");

      await fetchComments();

      if (refreshPosts) {
        refreshPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Comments
      </DialogTitle>

      <DialogContent>
        {comments.length === 0 ? (
          <Typography>
            No comments yet
          </Typography>
        ) : (
          comments.map((item) => (
            <Box
              key={item._id}
              sx={{
                mb: 2,
                borderBottom: "1px solid #eee",
                pb: 1,
              }}
            >
              <Typography fontWeight="bold">
                {item.username}
              </Typography>

              <Typography>
                {item.comment}
              </Typography>
            </Box>
          ))
        )}

        <TextField
          fullWidth
          label="Add Comment"
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Close
        </Button>

        <Button
          variant="contained"
          onClick={handleAddComment}
        >
          Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentModal;